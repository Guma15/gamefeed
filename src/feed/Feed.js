import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';
import * as rssParser from 'react-native-rss-parser';

export class FetchFeed extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://nichegamer.com/feed/')
      .then((response) => response.text())
      .then(async (responseData) => {
        const rss = await rssParser.parse(responseData);
        console.log(rss.title);
        console.log(rss.items.length);
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

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }
}

export default FetchFeed;
