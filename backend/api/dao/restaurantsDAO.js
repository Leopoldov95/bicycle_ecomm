let restaurants;

// initallly connect to the database on server startup
export default class RestaurantDAO {
  static async injectDB(conn) {
    if (restaurants) {
      return;
    }
    try {
      restaurants = await conn
        .db(process.env.RESTREVIEWS_NS)
        .collection("restaurants");
      // the collection name is the name of the object pertaining to where the data is being fetched from
    } catch (err) {
      console.log(
        `unable to establish a collection handle in restaurantsDAO: ${err}`
      );
    }
  }

  static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        //$text searches anywhere in the text
        query = { $text: { $search: filters["name"] } };
      } else if ("cuisine" in filters) {
        //$eq seraches for an equal
        query = { cuisine: { $eq: filters["cuisine"] } };
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } };
      }
    }
    let cursor;

    try {
      cursor = await restaurants.find(query);
    } catch (err) {
      console.error(`Unable to issue find commmand, ${err}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
    const displayCursor = cursor
      .limit(restaurantsPerPage)
      .skip(restaurantsPerPage * page); //.skip allows us to go to a certain page number

    try {
      const restaurantsList = await displayCursor.toArray();
      const totalNumRestaurants = await restaurants.countDocument(query);

      return { restaurantsList, totalNumRestaurants };
    } catch (err) {
      console.err(
        `Unable to convert cursor to array or problem counting documents, ${err}`
      );
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
  }
}
