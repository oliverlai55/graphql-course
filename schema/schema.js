const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

//Schema file for User
const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: GraphQLString },
		firstName: { type: GraphQLString },
		age: { type: GraphQLInt }
	}
});
