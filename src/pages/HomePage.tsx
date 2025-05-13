import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, TrendingUp, Users, CheckCircle, Loader } from 'lucide-react';
import ProjectCard from '../components/shared/ProjectCard';
import Logo from '../components/shared/Logo';
import { useWeb3 } from '../context/Web3Context';
import { Project } from '../types/project';
import { ethers } from 'ethers';

const HomePage: React.FC = () => {
  const { fundingContract, isConnected } = useWeb3();
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch projects from blockchain
  useEffect(() => {
    const fetchProjects = async () => {
      if (!fundingContract) {
        setIsLoading(false);
        return;
      }

      try {
        console.log("HomePage: Fetching projects from contract:", fundingContract);

        // Get project count
        const projectCount = await fundingContract.getProjectCount();
        console.log("HomePage: Total project count:", projectCount.toString());

        if (projectCount > 0) {
          // Fetch projects
          const projects: Project[] = [];
          const count = Math.min(Number(projectCount), 3); // Get up to 3 projects

          // Start from the most recent project (highest ID) and get the latest 3 (or fewer if there aren't 3)
          // Make sure we don't go below 1 (the first project ID)
          const startId = Number(projectCount);
          const endId = Math.max(1, startId - count + 1);

          console.log(`HomePage: Fetching projects from ID ${startId} to ${endId}`);

          for (let i = startId; i >= endId; i--) {
            try {
              console.log(`HomePage: Fetching project ${i}`);
              const projectData = await fundingContract.projects(i);
              console.log(`HomePage: Raw project data for ID ${i}:`, projectData);

              // Skip projects with empty titles (might be deleted or invalid)
              if (!projectData.title) {
                console.log(`HomePage: Skipping project ${i} - empty title`);
                continue;
              }

              // Convert project data to our Project type
              const project: Project = {
                id: projectData.id.toString(),
                title: projectData.title,
                description: projectData.description,
                category: projectData.category,
                goal: parseFloat(ethers.formatEther(projectData.goal)),
                currentAmount: parseFloat(ethers.formatEther(projectData.currentAmount)),
                creator: projectData.creator,
                deadline: Number(projectData.deadline),
                createdAt: Number(projectData.createdAt),
                image: projectData.imageUrl || 'https://images.pexels.com/photos/7893793/pexels-photo-7893793.jpeg',
                location: projectData.location,
              };

              console.log(`HomePage: Added project ${i}: ${project.title}`);
              projects.push(project);
            } catch (error) {
              console.error(`HomePage: Error fetching project ${i}:`, error);
            }
          }

          console.log(`HomePage: Found ${projects.length} projects to display`);
          setFeaturedProjects(projects);
        } else {
          console.log("HomePage: No projects found (count is 0)");
          setFeaturedProjects([]);
        }
      } catch (error) {
        console.error("HomePage: Error fetching projects:", error);
        setFeaturedProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if we have a contract
    if (fundingContract) {
      console.log("HomePage: Contract is available, fetching projects...");
      setIsLoading(true);
      fetchProjects();
    } else {
      console.log("HomePage: No contract available yet");
      setIsLoading(false);
    }
  }, [fundingContract]);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 to-primary-900 text-white py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7863465/pexels-photo-7863465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center" />
        </div>
        <div className="container-pad relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Transparent Community Project Funding
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Support local community initiatives with full transparency through blockchain technology.
              Every donation is traceable, and every withdrawal is accountable.
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/projects" className="btn btn-accent font-medium px-6 py-3">
                Browse Projects
              </Link>
              <Link to="/create" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-700 font-medium px-6 py-3">
                Create Project
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-pad">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Why Choose CommunityCoin?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform leverages blockchain technology to ensure complete transparency and accountability in community project funding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              className="bg-gray-50 rounded-xl p-6"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">100% Transparent</h3>
              <p className="text-gray-600">
                All transactions are recorded on the blockchain, ensuring complete transparency from donation to disbursement.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 rounded-xl p-6"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Direct Impact</h3>
              <p className="text-gray-600">
                Funds go directly to community projects without intermediaries, maximizing the impact of every donation.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 rounded-xl p-6"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Community Governed</h3>
              <p className="text-gray-600">
                Projects are validated and monitored by the community, ensuring accountability to supporters.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-50 rounded-xl p-6"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Verified Projects</h3>
              <p className="text-gray-600">
                Each project undergoes verification to ensure legitimacy before being listed on our platform.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-pad">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold">Featured Projects</h2>
              <p className="text-gray-600 mt-2">Discover and support these community initiatives</p>
            </div>
            <Link
              to="/projects"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center group bg-white py-2 px-4 rounded-lg shadow-sm hover:shadow transition-all"
            >
              <span>View All Projects</span>
              <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="col-span-3 py-16 text-center">
                <div className="bg-white rounded-xl shadow-sm p-8 max-w-lg mx-auto">
                  <Loader className="h-10 w-10 mx-auto text-primary-600 animate-spin mb-4" />
                  <p className="text-gray-700 font-medium">Loading featured projects...</p>
                  <p className="text-gray-500 text-sm mt-2">Please wait while we fetch the latest community initiatives</p>
                </div>
              </div>
            ) : featuredProjects.length > 0 ? (
              <>
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
                {featuredProjects.length < 3 && isConnected && (
                  <motion.div
                    className="h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Link
                      to="/create"
                      className="card group h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 bg-white/50 hover:border-primary-300 hover:bg-white transition-all"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <ArrowRight className="h-6 w-6 text-primary-600 rotate-45" />
                      </div>
                      <h3 className="text-lg font-heading font-semibold mb-2 text-center">Create New Project</h3>
                      <p className="text-gray-600 text-sm text-center mb-0">
                        Start your own community initiative
                      </p>
                    </Link>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                className="col-span-3 py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-xl shadow-md p-8 max-w-lg mx-auto text-center border-t-4 border-primary-600">
                  <div className="mb-6">
                    <div className="w-24 h-24 flex items-center justify-center mx-auto">
                      <Logo className="h-full w-full" animated={true} />
                    </div>
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3">No Projects Yet</h3>
                  <p className="text-gray-600 mb-6">
                    Be the first to create a community project and make a difference!
                    <span className="block mt-2 text-sm text-gray-500">
                      Note: You need to connect your wallet to create a project.
                    </span>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      to="/create"
                      className="btn btn-primary px-6 py-3 flex items-center justify-center"
                    >
                      Create Project
                    </Link>
                    {!isConnected && (
                      <Link
                        to="/about"
                        className="btn btn-outline-primary px-6 py-3"
                      >
                        Learn More
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {featuredProjects.length > 0 && (
            <div className="mt-12 text-center">
              <Link
                to="/projects"
                className="btn btn-outline-primary px-8 py-3 inline-flex items-center"
              >
                <span>Explore All Projects</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary-500 text-white">
        <div className="container-pad text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Start a community project or support existing initiatives today.
            Together, we can build stronger, more vibrant communities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/create"
              className="btn bg-white text-secondary-600 hover:bg-gray-100 font-medium px-6 py-3"
            >
              Start Your Project
            </Link>
            <Link
              to="/projects"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-secondary-600 font-medium px-6 py-3"
            >
              Explore Projects
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container-pad">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform makes it simple to fund and track community projects with complete transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Create or Support</h3>
              <p className="text-gray-600">
                Create a new community project or browse existing ones to support with your donation.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Fund Transparently</h3>
              <p className="text-gray-600">
                All donations are recorded on the blockchain, creating an immutable record of support.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Monitor project progress and fund disbursement with complete visibility at every step.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;