import React, {createRef, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Text, Header, Body, Button, Title, Card, CardItem} from 'native-base';
import ActionSheet from 'react-native-actions-sheet';
import {API_URL} from '@env';

const actionSheetRef = createRef();

import Icon from 'react-native-vector-icons/FontAwesome';
import photo from '../../assets/images/photo.png';
import {getProductCategory, getSortProduct} from '../../redux/actions/product';
import LoadingIndicator from '../../components/ModalLoading';

const Catalog = ({navigation, route}) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductCategory(route.params));
  }, [dispatch, route.params]);

  const getNew = async () => {
    await dispatch(getSortProduct('input_date', 'desc'));
    navigation.navigate('Catalog');
  };
  const priceLow = async () => {
    await dispatch(getSortProduct('price', 'asc'));
    navigation.navigate('Catalog');
  };
  const priceHight = async () => {
    await dispatch(getSortProduct('price', 'desc'));
    navigation.navigate('Catalog');
  };

  const {isLoading, allData, isError, message, dataCategory} = product;
  return (
    <>
      <Header style={styles.header} noLeft transparent>
        <StatusBar backgroundColor={'green'} />
        <Button transparent>
          <Icon
            name="angle-left"
            size={30}
            onPress={() => navigation.goBack()}
          />
        </Button>
        <Body>
          <Title style={styles.text}>
            {dataCategory !== '' ? dataCategory[0].category_name : 'All Poduct'}
          </Title>
        </Body>
        <Button transparent onPress={() => navigation.navigate('Search')}>
          <Icon name="search" size={22} />
        </Button>
      </Header>
      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.filter}
          onPress={() => navigation.navigate('Filter')}>
          <Icon name="filter" size={20} />
          <Text note style={styles.filterTxt}>
            Filters
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sort}
          onPress={() => {
            actionSheetRef.current?.setModalVisible();
          }}>
          <Icon name="sort" size={20} />
          <Text note style={styles.sortTxt}>
            Sort
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="th-list" size={20} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {isLoading === false &&
          (dataCategory !== ''
            ? dataCategory.length !== 0
            : allData.length !== 0) &&
          (dataCategory !== '' ? dataCategory : allData).map((item) => {
            return (
              <View style={styles.parent} key={item.id}>
                <View style={styles.CardProduct}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('DetailProduct', item.id)
                    }>
                    <Card transparent>
                      <CardItem style={styles.cardItem}>
                        <Body>
                          <Image
                            style={styles.productImg}
                            source={
                              item.url ? {uri: `${API_URL}${item.url}`} : photo
                            }
                          />
                          <View style={styles.star}>
                            <Icon name="star-o" size={18} />
                            <Icon name="star-o" size={18} />
                            <Icon name="star-o" size={18} />
                            <Icon name="star-o" size={18} />
                            <Icon name="star-o" size={18} />
                          </View>
                          <Text style={styles.name}>{item.name}</Text>
                          <Text note>{item.category_name}</Text>
                          <Text style={styles.price}>Rp. {item.price}</Text>
                        </Body>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('DetailProduct', item.id)
                    }>
                    <Card transparent>
                      <CardItem style={styles.cardItem}>
                        <Body>
                          <Image
                            style={styles.productImg}
                            source={
                              item.url ? {uri: `${API_URL}${item.url}`} : photo
                            }
                          />
                          <View style={styles.star}>
                            <Icon name="star-o" size={18} />
                            <Icon name="star-o" size={18} />
                            <Icon name="star-o" size={18} />
                            <Icon name="star-o" size={18} />
                            <Icon name="star-o" size={18} />
                          </View>
                          <Text style={styles.name}>{item.name}</Text>
                          <Text note>{item.category_name}</Text>
                          <Text style={styles.price}>Rp. {item.price}</Text>
                        </Body>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        {isLoading === true && isError === false && <LoadingIndicator />}
        {isError === true && message !== '' && <Text>{message}</Text>}
      </ScrollView>
      <ActionSheet styles={styles.actionSheet} ref={actionSheetRef}>
        <View style={styles.border} />
        <View>
          <Text style={styles.sortBy}>Sort By</Text>
          <TouchableOpacity style={styles.btnSort} block>
            <Text style={styles.btntext}>Poppular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSort} block onPress={getNew}>
            <Text style={styles.btntext}>Newest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSort} block>
            <Text style={styles.btntext}>Custtommer Review</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSort} bloc onPress={priceHight}>
            <Text style={styles.btntext}>Price: Lowes to High</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSort} block onPress={priceLow}>
            <Text style={styles.btntext}>Price: Hight to Lowes</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </>
  );
};

export default Catalog;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#000000',
    paddingLeft: 90,
  },
  parent: {
    backgroundColor: '#fafafa',
    width: 'auto',
  },
  productImg: {
    width: 150,
    height: 200,
  },
  star: {
    flexDirection: 'row',
    marginTop: 5,
  },
  name: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
  },
  menu: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
  },
  cardItem: {
    width: 170,
    backgroundColor: '#fafafa',
  },
  CardProduct: {
    flexDirection: 'row',
  },
  filter: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  sort: {
    flexDirection: 'row',
    marginLeft: 70,
    marginRight: 130,
  },
  filterTxt: {
    marginLeft: 5,
    fontSize: 15,
  },
  sortTxt: {
    marginLeft: 5,
    fontSize: 15,
  },
  border: {
    borderBottomWidth: 5,
    width: 70,
    marginTop: 20,
    marginLeft: 140,
    marginBottom: 10,
    borderRadius: 50,
    borderColor: '#e8e8e8',
  },
  sortBy: {
    fontSize: 20,
    paddingLeft: 145,
  },
  btnSort: {
    marginTop: 5,
    height: 45,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  btntext: {
    color: '#000000',
  },
});
