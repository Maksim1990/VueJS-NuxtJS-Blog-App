<template>
  <div class="accordion" role="tablist">
    <b-card no-body class="mb-1" v-for="item in items" :key="item.id">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle="`accordion-${item.id}`">{{item.question}}</b-button>
      </b-card-header>
      <b-collapse :id="`accordion-${item.id}`" visible accordion="faq-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>{{item.answer}}</b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ['items']
}
</script>

