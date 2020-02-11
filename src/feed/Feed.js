import React from 'react';
import { FlatList, ActivityIndicator, Text, View, TouchableOpacity, Linking  } from 'react-native';
import * as rssParser from 'react-native-rss-parser';

export class FetchFeed extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

/*TODO Functionality to do multiple site fetching */
  componentDidMount(){
    return fetch('https://nichegamer.com/feed/')
      .then((response) => response.text())
      .then(async (responseData) => {
        const rss = await rssParser.parse(responseData);
        console.log(rss.title);
	    this.setState({
			isLoading: false,
			dataSource: rss,
		}, function(){
		});
	  })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
	/*TODO Pre-sort and clean output */
	const data = this.state.dataSource.items;
	console.log(data[0].published);
	console.log(data[0].title);
	console.log(data[0].id);
	
    return(
	/*TODO Add proper design for UI  */
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource.items}
          renderItem={({item}) => <TouchableOpacity onPress={() => Linking.openURL(item.id)}>
		  <Text style={{color: 'blue'}}>
		    {item.published} - {item.title}
		  </Text></TouchableOpacity>}
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }
}

export default FetchFeed;
