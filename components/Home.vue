<template>
  <div>
    <Banner />
    <StatInfo />
    <CoursesInfo />
    <ReviewsSection />
    <itTalks />
    <FooterContent />
    <ScrollUpButton />
  </div>
</template>
<script>
import Banner from "~/components/HomePageComponents/Banner";
import itTalks from "~/components/HomePageComponents/itTalks";
import StatInfo from "~/components/HomePageComponents/StatInfo";
import ReviewsSection from "~/components/HomePageComponents/ReviewsSection";
import CoursesInfo from "~/components/HomePageComponents/CoursesInfo";
import FooterContent from "~/components/HomePageComponents/FooterContent";
import ScrollUpButton from "~/components/PageComponents/ScrollUpButton";

export default {
  components: {Banner,StatInfo,CoursesInfo,ScrollUpButton,FooterContent,ReviewsSection,itTalks}
}
</script>
