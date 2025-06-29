const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const fetch = require('node-fetch');


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

         // get all users
      users: async () => {
        return User.find()
        .select('-__v -password')
        .populate('savedBooks')
      },

       // get a user by username
       user: async (parent, { username }) => {
         return User.findOne({ username })
         .select('-__v -password')
         .populate('savedBooks')
       },

       searchBooks: async (parent, { query }) => {
            try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
            const data = await response.json();

            if (!data.items) return [];

            return data.items.map((item) => ({
              bookId: item.id,
              authors: item.volumeInfo.authors || [],
              description: item.volumeInfo.description || '',
              title: item.volumeInfo.title || 'No title',
              image: item.volumeInfo.imageLinks?.thumbnail || '',
              link: item.volumeInfo.infoLink || '',
            }));
          } catch (err) {
            console.error('Google Books API error:', err);
            throw new Error('Failed to fetch books from Google Books API');
          }
        }
       
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
        saveBook: async (parent, { input }, context) => {
          if (context.user) {
            const user = await User.findById(context.user._id);

            // prevent duplicate books from being saved
            const alreadySaved = user.savedBooks.some((book) => book.bookId === input.bookId);

             
             if (alreadySaved) {
              throw new Error('This book is already saved.');
            }

            user.savedBooks.push(input);
            await user.save();
        
            return user;

          }
        
          throw new AuthenticationError('You need to be logged in!');
        },
        // delete book from user
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
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