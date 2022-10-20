const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({_id: context.user._id})
                .select('-__v -password')
                .populate('savedBooks')
          
                return userData;
          }
            throw new AuthenticationError('Not logged in');
          },
       // get a user by username
       user: async (parent, { username }) => {
         return User.findOne({ username })
         .select('-__v -password')
         .populate('savedBooks')
       },
       
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
    
            return { token, user} ;
      
        },
        login: async (parent, { email, password }) => {
        
            const user = await User.findOne({ email })
            
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
            
            const token = signToken(user);
    
            return { token, user};
      
        },
        // add book to user
        saveBook: async (parent, { userId, bookId }, context) => {
          if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: userId },
              { $push: { savedBooks: { bookId, username: context.user.username } } },
              { new: true, runValidators: true }
            );
        
            return updatedUser;
          }
        
          throw new AuthenticationError('You need to be logged in!');
        },
        // delete book from user
        removeBook: async (parent, { userId, bookId }, context) => {
            if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
              );
                return updatedUser;
            }
                throw new AuthenticationError('You need to be logged in!');

        }

        
         
    }

};

module.exports = resolvers;