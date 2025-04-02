import React from "react";
import Header from "./components/Header";
import QuoteCarousel from "./components/QuoteCarousel";
import Counter from "./components/Counter";
import Milestones from "./components/Milestones";
import Places from "./components/Places";
import Timeline from "./components/Timeline";
import BucketList from "./components/BucketList";
import FunFacts from "./components/FunFacts";
import MusicPlayer from "./components/MusicPlayer";
import HeartAnimation from "./components/HeartAnimation";

// Import CSS
import "./css/base/layout.css";
import "./css/base/typography.css";
import "./css/base/variables.css";
import "./css/utils/animations.css";
import "./css/utils/shared.css";
import "./css/components/bucket-list.css";
import "./css/components/counter.css";
import "./css/components/fun-facts.css";
import "./css/components/milestones.css";
import "./css/components/places.css";
import "./css/components/quotes.css";
import "./css/components/timeline.css";

function App() {
    return (
        <>
            <HeartAnimation/>
            <Header/>
            <QuoteCarousel/>
            <Counter/>
            <Milestones/>
            <Places/>
            <Timeline/>
            <BucketList/>
            <FunFacts/>
            <MusicPlayer/>
        </>
    );
}

export default App;
