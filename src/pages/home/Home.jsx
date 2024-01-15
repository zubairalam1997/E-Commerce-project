// Home.jsx
import React, { useContext } from 'react';
import Layout from '../../components/layout/Layout';
import HeroSection from '../../components/heroSection/HeroSection';
import Filter from '../../components/filter/Filter';
import ProductCard from '../../components/productCard/ProductCard';
import Testimonial from '../../components/testimonial/Testimonial';

const Home = () => {
 
  return (
    <div>
      <Layout>
        <HeroSection />
        <Filter />
        <ProductCard />
        <Testimonial />
         </Layout>
    </div>
  );
};

export default Home;
