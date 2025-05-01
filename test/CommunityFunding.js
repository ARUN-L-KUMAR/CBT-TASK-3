const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CommunityFunding", function () {
  let CommunityFunding;
  let communityFunding;
  let owner;
  let addr1;
  let addr2;
  
  // Project details for testing
  const projectTitle = "Test Community Project";
  const projectDescription = "This is a test community project";
  const projectCategory = "environment";
  const projectGoal = ethers.parseEther("1.0");
  const now = Math.floor(Date.now() / 1000);
  const projectDeadline = now + 86400; // 1 day from now
  const projectLocation = "Chennai, India";
  const projectImageUrl = "https://example.com/image.jpg";

  beforeEach(async function () {
    CommunityFunding = await ethers.getContractFactory("CommunityFunding");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    
    communityFunding = await CommunityFunding.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await communityFunding.owner()).to.equal(owner.address);
    });

    it("Should start with 0 projects", async function () {
      expect(await communityFunding.getProjectCount()).to.equal(0);
    });
  });

  describe("Project Creation", function () {
    it("Should create a new project with correct details", async function () {
      await communityFunding.createProject(
        projectTitle,
        projectDescription,
        projectCategory,
        projectGoal,
        projectDeadline,
        projectLocation,
        projectImageUrl
      );
      
      const projectCount = await communityFunding.getProjectCount();
      expect(projectCount).to.equal(1);
      
      const project = await communityFunding.getProject(1);
      expect(project[0]).to.equal(1); // id
      expect(project[1]).to.equal(projectTitle); // title
      expect(project[2]).to.equal(projectDescription); // description
      expect(project[3]).to.equal(projectCategory); // category
      expect(project[4]).to.equal(projectGoal); // goal
      expect(project[5]).to.equal(0); // currentAmount
      expect(project[6]).to.equal(owner.address); // creator
      expect(project[7]).to.equal(projectDeadline); // deadline
      expect(project[9]).to.equal(projectLocation); // location
      expect(project[10]).to.equal(projectImageUrl); // imageUrl
    });

    it("Should emit ProjectCreated event", async function () {
      await expect(
        communityFunding.createProject(
          projectTitle,
          projectDescription,
          projectCategory,
          projectGoal,
          projectDeadline,
          projectLocation,
          projectImageUrl
        )
      )
        .to.emit(communityFunding, "ProjectCreated")
        .withArgs(1, owner.address, projectTitle, projectGoal, projectDeadline);
    });

    it("Should revert if goal is zero", async function () {
      await expect(
        communityFunding.createProject(
          projectTitle,
          projectDescription,
          projectCategory,
          0,
          projectDeadline,
          projectLocation,
          projectImageUrl
        )
      ).to.be.revertedWith("Goal must be greater than zero");
    });

    it("Should revert if deadline is in the past", async function () {
      const pastDeadline = now - 86400; // 1 day ago
      
      await expect(
        communityFunding.createProject(
          projectTitle,
          projectDescription,
          projectCategory,
          projectGoal,
          pastDeadline,
          projectLocation,
          projectImageUrl
        )
      ).to.be.revertedWith("Deadline must be in the future");
    });
  });

  describe("Donations", function () {
    beforeEach(async function () {
      // Create a project for testing donations
      await communityFunding.createProject(
        projectTitle,
        projectDescription,
        projectCategory,
        projectGoal,
        projectDeadline,
        projectLocation,
        projectImageUrl
      );
    });

    it("Should accept donations to a project", async function () {
      const donationAmount = ethers.parseEther("0.5");
      
      await expect(
        communityFunding.connect(addr1).donateToProject(1, { value: donationAmount })
      )
        .to.emit(communityFunding, "DonationReceived")
        .withArgs(1, addr1.address, donationAmount);
      
      const project = await communityFunding.getProject(1);
      expect(project[5]).to.equal(donationAmount); // currentAmount
    });

    it("Should revert if donation amount is zero", async function () {
      await expect(
        communityFunding.connect(addr1).donateToProject(1, { value: 0 })
      ).to.be.revertedWith("Donation amount must be greater than zero");
    });

    it("Should revert if project doesn't exist", async function () {
      const donationAmount = ethers.parseEther("0.5");
      
      await expect(
        communityFunding.connect(addr1).donateToProject(99, { value: donationAmount })
      ).to.be.revertedWith("Project does not exist");
    });
  });

  describe("Fund Withdrawal", function () {
    beforeEach(async function () {
      // Create a project and donate to it
      await communityFunding.connect(addr1).createProject(
        projectTitle,
        projectDescription,
        projectCategory,
        projectGoal,
        projectDeadline,
        projectLocation,
        projectImageUrl
      );
      
      const donationAmount = ethers.parseEther("0.5");
      await communityFunding.connect(addr2).donateToProject(1, { value: donationAmount });
    });

    it("Should allow project creator to withdraw funds", async function () {
      const initialBalance = await ethers.provider.getBalance(addr1.address);
      
      await expect(
        communityFunding.connect(addr1).withdrawFunds(1)
      )
        .to.emit(communityFunding, "FundsWithdrawn")
        .withArgs(1, addr1.address, ethers.parseEther("0.5"));
      
      const finalBalance = await ethers.provider.getBalance(addr1.address);
      expect(finalBalance).to.be.gt(initialBalance);
      
      const project = await communityFunding.getProject(1);
      expect(project[5]).to.equal(0); // currentAmount
    });

    it("Should revert if non-creator tries to withdraw", async function () {
      await expect(
        communityFunding.connect(addr2).withdrawFunds(1)
      ).to.be.revertedWith("Only the project creator can withdraw funds");
    });

    it("Should revert if no funds are available", async function () {
      // First withdraw all funds
      await communityFunding.connect(addr1).withdrawFunds(1);
      
      // Then try to withdraw again
      await expect(
        communityFunding.connect(addr1).withdrawFunds(1)
      ).to.be.revertedWith("No funds available to withdraw");
    });
  });
});