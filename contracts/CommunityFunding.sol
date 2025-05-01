// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title CommunityFunding
 * @dev A contract for transparent community project funding
 */
contract CommunityFunding is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _projectIds;

    // Define project struct
    struct Project {
        uint256 id;
        string title;
        string description;
        string category;
        uint256 goal;
        uint256 currentAmount;
        address payable creator;
        uint256 deadline;
        uint256 createdAt;
        string location;
        string imageUrl;
    }

    // Mapping from project ID to Project
    mapping(uint256 => Project) public projects;

    // Events
    event ProjectCreated(
        uint256 indexed projectId,
        address indexed creator,
        string title,
        uint256 goal,
        uint256 deadline
    );
    
    event DonationReceived(
        uint256 indexed projectId,
        address indexed donor,
        uint256 amount
    );
    
    event FundsWithdrawn(
        uint256 indexed projectId,
        address indexed creator,
        uint256 amount
    );

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Creates a new project
     * @param _title Project title
     * @param _description Project description
     * @param _category Project category
     * @param _goal Funding goal in wei
     * @param _deadline Unix timestamp of funding deadline
     * @param _location Project location (optional)
     * @param _imageUrl URL to project image (optional)
     * @return projectId The ID of the newly created project
     */
    function createProject(
        string memory _title,
        string memory _description,
        string memory _category,
        uint256 _goal,
        uint256 _deadline,
        string memory _location,
        string memory _imageUrl
    ) public returns (uint256) {
        require(_goal > 0, "Goal must be greater than zero");
        require(_deadline > block.timestamp, "Deadline must be in the future");
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");

        _projectIds.increment();
        uint256 newProjectId = _projectIds.current();
        
        projects[newProjectId] = Project({
            id: newProjectId,
            title: _title,
            description: _description,
            category: _category,
            goal: _goal,
            currentAmount: 0,
            creator: payable(msg.sender),
            deadline: _deadline,
            createdAt: block.timestamp,
            location: _location,
            imageUrl: _imageUrl
        });
        
        emit ProjectCreated(newProjectId, msg.sender, _title, _goal, _deadline);
        
        return newProjectId;
    }

    /**
     * @dev Donate to a project
     * @param _projectId The ID of the project to donate to
     */
    function donateToProject(uint256 _projectId) public payable {
        Project storage project = projects[_projectId];
        
        require(project.id == _projectId, "Project does not exist");
        require(block.timestamp <= project.deadline, "Project funding has ended");
        require(msg.value > 0, "Donation amount must be greater than zero");
        
        project.currentAmount += msg.value;
        
        emit DonationReceived(_projectId, msg.sender, msg.value);
    }

    /**
     * @dev Withdraw funds from a project
     * @param _projectId The ID of the project to withdraw funds from
     */
    function withdrawFunds(uint256 _projectId) public {
        Project storage project = projects[_projectId];
        
        require(project.id == _projectId, "Project does not exist");
        require(msg.sender == project.creator, "Only the project creator can withdraw funds");
        require(project.currentAmount > 0, "No funds available to withdraw");
        
        uint256 amount = project.currentAmount;
        project.currentAmount = 0;
        
        (bool success, ) = project.creator.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit FundsWithdrawn(_projectId, msg.sender, amount);
    }

    /**
     * @dev Get project details
     * @param _projectId The ID of the project
     * @return Project details
     */
    function getProject(uint256 _projectId) public view returns (
        uint256 id,
        string memory title,
        string memory description,
        string memory category,
        uint256 goal,
        uint256 currentAmount,
        address creator,
        uint256 deadline,
        uint256 createdAt,
        string memory location,
        string memory imageUrl
    ) {
        Project memory project = projects[_projectId];
        require(project.id == _projectId, "Project does not exist");
        
        return (
            project.id,
            project.title,
            project.description,
            project.category,
            project.goal,
            project.currentAmount,
            project.creator,
            project.deadline,
            project.createdAt,
            project.location,
            project.imageUrl
        );
    }

    /**
     * @dev Get total number of projects
     * @return Total number of projects
     */
    function getProjectCount() public view returns (uint256) {
        return _projectIds.current();
    }
}