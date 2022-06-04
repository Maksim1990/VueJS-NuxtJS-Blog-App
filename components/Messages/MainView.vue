<template>
  <b-container>
    <b-row>
      <LeftBlockView/>
      <RightBlockView/>
    </b-row>
  </b-container>
</template>

<script>
import RightBlockView from "~/components/Messages/RightPanel/RightBlockView";
import LeftBlockView from "~/components/Messages/LeftPanel/LeftBlockView";

export default {
  components: {RightBlockView, LeftBlockView}
}
</script>
