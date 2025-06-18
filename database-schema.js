// MongoDB Schema for Skillora LMS
// This file contains the database schema definitions

const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['student', 'instructor'],
    default: 'student'
  },
  bio: {
    type: String,
    trim: true
  },
  profilePicture: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isBanned: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  createdCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
}, {
  timestamps: true
});

// Course Schema
const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  content: {
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  lessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }]
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    trim: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Instructor is required']
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: [true, 'Level is required']
  },
  thumbnail: {
    type: String,
    required: [true, 'Thumbnail is required']
  },
  modules: [moduleSchema],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  }
}, {
  timestamps: true
});

// Course Progress Schema
const courseProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  completedModules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course.modules'
  }],
  lastAccessed: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Export schemas
module.exports = {
  userSchema,
  courseSchema,
  courseProgressSchema
}; 