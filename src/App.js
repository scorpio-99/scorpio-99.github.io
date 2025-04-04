import React from "react";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout";
import Header from "./components/Header";
import QuoteCarousel from "./components/QuoteCarousel";
import Counter from "./components/Counter";
import Milestones from "./components/Milestones";
import Places from "./components/Places";
import Gallery from "./components/Gallery";
import HeartAnimation from "./components/HeartAnimation";
import "./css/styles.css";

function App() {
    return (
        <AppProvider>
            <HeartAnimation />
            <Layout>
                <Header />
                <QuoteCarousel />
                <Counter />
                <Milestones />
                <Places />
                <Gallery />
            </Layout>
        </AppProvider>
    );
}

export default App;
