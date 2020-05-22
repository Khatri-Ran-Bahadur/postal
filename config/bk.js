import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";

const query = gql``;

const A = () => (
  <Query query={query}>
    {({ loading, error, data }) => {
      if (loading) {
        return <h1>Loading...</h1>;
      }
      return <div></div>;
    }}
  </Query>
);

const B = () => {};

const another = gql`
  query getToasterBySlug($slug: String) {
    toaster: toasterBy(uri: $slug) {
      title
      toasterMeta {
        price
      }
    }
  }
`;

export default graphql(another, {
  options: props => {
    const slug = props.match.params.slug;
    return {
      variables: {
        slug
      }
    };
  }
})(B);

/**
 * 
 *  In wp-content/themes/functions.php
add_action('init', function () {
	register_post_type('AboutUs', [
		'public' => true,
		'label' => 'About Us',
		'show_in_graphql' => true,
		'graphql_single_name' => 'AboutUs',
		'graphql_plural_name' => 'AboutUs'
	]);
});

 */
