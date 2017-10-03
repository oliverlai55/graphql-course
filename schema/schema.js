const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;
const axios = require('axios');

const CompanyType = new GraphQLObjectType({
	name: 'Company',
	fields: {
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		description: { type: GraphQLString }
	}
});

//Schema file for User

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: GraphQLString },
		firstName: { type: GraphQLString },
		age: { type: GraphQLInt },
		company {
			type: CompanyType
		}
	}
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLString } },
			resolve(parentValue, args) {
				return axios
					.get(`http://localhost:3000/users/${args.id}`)
					.then(resp => resp.data);
				//we do this because when we respond data from json server, its listed as data {}
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});

// args stuff required to find the info (ie id)
// args.id the id is coming in from the query when its made
// Rootquery allows us to entre graph of data to look for info
// Resolve is a function that returns a piece of info
// Rootquery goes to user key to find fields object, arg should come
// with id with type string
// Objects gets returned in into raw JS object, don't have to worry about type, graphql takes care of it
