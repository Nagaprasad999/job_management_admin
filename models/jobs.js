module.exports = (sequelize, DataTypes) => {
    const Job = sequelize.define("Job", {
      title: DataTypes.STRING,
      company: DataTypes.STRING,
      location: DataTypes.STRING,
      jobType: DataTypes.ENUM("Full-time", "Part-time", "Contract", "Internship"),
      salary: DataTypes.STRING,
      description: DataTypes.TEXT,
      requirements: DataTypes.TEXT,
      responsibilities: DataTypes.TEXT,
      deadline: DataTypes.DATE,
    });
    return Job;
  };
  