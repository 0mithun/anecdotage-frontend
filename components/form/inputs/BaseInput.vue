<template>
  <div>
    <input
      class="form-control font-14 fw-300"
      :type="inputType"
      :value="value"
      :readonly="readonly"
      :id="id"
      :placeholder="placeholder"
      :class="[{ 'is-invalid': form.errors.has(field) }, inputSize, classes]"
      @input="handleInput"
      :disabled="disabled"
      :autofocus="autofocus"
    />
    <has-error :form="form" :field="field"></has-error>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    inputType: {
      type: String,
      default: 'text',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputSize() {
      return this.size == '' ? 'form-control-lg' : this.size;
    },
  },

  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value);
    },
  },

  mounted() {
    //console.log(this.$attrs);
  },
};
</script>

