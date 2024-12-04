import React, { useState } from "react";
import { Search, Briefcase, Plus, Newspaper, ArrowRight } from "lucide-react";
import Header from "./Header";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
    {children}
  </div>
);

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-colors";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border border-gray-300 hover:bg-gray-50",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}>
      {children}
    </button>
  );
};

const BlogPost = ({ title, excerpt, date, image }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <span className="text-sm text-gray-500">{date}</span>
      <h3 className="text-xl font-semibold mt-2 text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{excerpt}</p>
      <Button variant="outline" className="mt-4 flex items-center gap-2">
        Read more <ArrowRight size={16} />
      </Button>
    </div>
  </div>
);

const BlogSection = () => {
  const [posts] = useState([
    {
      id: 1,
      title: "Remote Work Best Practices",
      excerpt:
        "Learn how to stay productive and maintain work-life balance while working remotely.",
      date: "March 15, 2024",
      image: "/src/images/jobs.jpg",
    },
    {
      id: 2,
      title: "Top Remote Job Interview Tips",
      excerpt:
        "Master the art of virtual interviews with these essential tips and tricks.",
      date: "March 10, 2024",
      image: "/src/images/jobs.jpg",
    },
    {
      id: 3,
      title: "Building a Remote Work Portfolio",
      excerpt:
        "Create an impressive portfolio that helps you stand out in the remote job market.",
      date: "March 5, 2024",
      image: "/src/images/jobs.jpg",
    },
  ]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Latest Blog Posts
          </h2>
          <Button variant="outline" className="flex items-center gap-2">
            View all posts <ArrowRight size={16} />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPost key={post.id} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

const JobBoard = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Data Entry Specialist",
      company: "TechCorp",
      type: "Full-time",
      level: "Entry-level",
      postedDate: "2 days ago",
    },
  ]);

  const [showPostForm, setShowPostForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    type: "Full-time",
    level: "Entry-level",
  });

  const categories = [
    "All",
    "Data Entry",
    "Customer Service",
    "Marketing",
    "IT",
    "Sales",
    "Writing",
    "Virtual Assistant",
  ];

  const handlePostJob = (e) => {
    e.preventDefault();
    setJobs([
      ...jobs,
      {
        ...newJob,
        id: jobs.length + 1,
        postedDate: "Just now",
      },
    ]);
    setShowPostForm(false);
    setNewJob({
      title: "",
      company: "",
      type: "Full-time",
      level: "Entry-level",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Add margin-top to account for fixed header */}
      <main className="pt-40">
        {" "}
        {/* Increased padding to account for the header height */}
        <div className="max-w-7xl mx-auto px-4 -mt-6">
          <Card className="mb-8">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full p-3 border rounded-lg pl-10"
                />
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
              </div>
              <Button
                onClick={() => setShowPostForm(true)}
                className="flex items-center gap-2">
                <Plus size={20} />
                Post Task
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {categories.map((category) => (
                <Button key={category} variant="outline">
                  {category}
                </Button>
              ))}
            </div>
          </Card>

          <div className="space-y-4 mb-12">
            {jobs.map((job) => (
              <Card key={job.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-blue-600">
                      {job.title}
                    </h2>
                    <p className="text-gray-600 mt-1">{job.company}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                        {job.type}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                        {job.level}
                      </span>
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {job.postedDate}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <BlogSection />
        {showPostForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Post a New Task</h2>
              <form onSubmit={handlePostJob} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border rounded"
                    value={newJob.title}
                    onChange={(e) =>
                      setNewJob({ ...newJob, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border rounded"
                    value={newJob.company}
                    onChange={(e) =>
                      setNewJob({ ...newJob, company: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Job Type
                  </label>
                  <select
                    className="w-full p-2 border rounded"
                    value={newJob.type}
                    onChange={(e) =>
                      setNewJob({ ...newJob, type: e.target.value })
                    }>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Level
                  </label>
                  <select
                    className="w-full p-2 border rounded"
                    value={newJob.level}
                    onChange={(e) =>
                      setNewJob({ ...newJob, level: e.target.value })
                    }>
                    <option>Entry-level</option>
                    <option>Mid-level</option>
                    <option>Senior</option>
                  </select>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button type="submit" className="flex-1">
                    Post Job
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setShowPostForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobBoard;
