import React, { useState ,useEffect } from 'react';
import MyContext from './myContext';
import { Timestamp, addDoc, collection,setDoc,deleteDoc,doc, onSnapshot, orderBy, query, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';

const MyState = (props) => {

  const [mode, setMode] = useState('light');

  const toggleMode = () => {
      if (mode === 'light') {
          setMode('dark');
          document.body.style.backgroundColor = 'rgb(17, 24, 39)';
      }
      else {
          setMode('light');
          document.body.style.backgroundColor = 'white';

      }
  }

  
  
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )

  })

  const addProduct = async ()=>{
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error('Please fill all fields')
    }
    const productRef = collection(fireDB, "products")
    setLoading(true)
    try {
      await addDoc(productRef, products)
      toast.success("Product Added successfully");
      setTimeout(()=>{
        window.location.href='/dashboard';
      },800);
      getProductData()
      closeModal()
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
   // setProducts("")
  }

  const [product , setProduct] = useState([]);

  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy('time'),
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray)
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(()=>{
    getProductData();
  },[]);

  const edithandle = (item) => {
    setProducts(item);
  }
  // update product
  
  const updateProduct = async()=> {
    setLoading(true)
    try {

        await setDoc(doc(fireDB, 'products', products.id), products)
        toast.success("Product Updated successfully")
        setTimeout(() => {
            window.location.href = '/dashboard'
        }, 500);
        getProductData();
        setLoading(false)

    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}

//delete

  const deleteProduct = async (item) => {

    try {
      setLoading(true)
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success('Product Deleted successfully')
      setLoading(false)
      getProductData()
    } catch (error) {
      // toast.success('Product Deleted Falied')
      setLoading(false)
    }
  }

 //orderinfo 
  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "order"))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false)
      });
      setOrder(ordersArray);
      console.log(ordersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  //user data

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "users"))
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false)
      });
      setUser(usersArray);
      console.log(usersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  //filters
  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')


  useEffect(() => {
   
    getOrderData();
    getUserData();

  }, []);

  return (
    <MyContext.Provider value={{mode, toggleMode,searchkey,filterType,filterPrice, setFilterPrice, setFilterType, setSearchkey ,loading ,setLoading ,products,product,setProduct, setProducts,addProduct,deleteProduct,updateProduct,edithandle,order,user}}>
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
