import React from "react";
import Layout from "./components/Layout";
import Header from "./components/Header";
import QuoteCarousel from "./components/QuoteCarousel";
import Counter from "./components/Counter";
import Milestones from "./components/Milestones";
import Places from "./components/Places";
import Gallery from "./components/Gallery";
import HeartAnimation from "./components/HeartAnimation";
import "./scss/styles.scss";

function App() {
    return (
        <>
            <HeartAnimation/>
            <Layout>
                <Header/>
                <QuoteCarousel/>
                <Counter/>
                <Milestones/>
                <Places/>
                <Gallery/>
            </Layout>
        </>
    );
}

export default App;
