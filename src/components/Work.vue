<template>
    <div class="custom-select" :tabindex="tabindex" @blur="open = false">
        <div class="selected" :class="{ open: open }" @click="open = !open">
            <div class="flexxxx">
                <div>
                    {{ selected }}
                </div>
            </div>
            <div>
                <img :src="imgSrc('arrow.svg')" alt="" />
            </div>
        </div>
        <div class="items" :class="{ selectHide: !open }">
            <div v-for="(option, i) of options" :key="i" @click="abc(option)">
                {{ option }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            required: true
        },
        default: {
            type: String,
            required: false,
            default: null
        },
        tabindex: {
            type: Number,
            required: false,
            default: 0
        }
    },
    data() {
        return {
            selected: this.default ? this.default : this.options.length > 0 ? this.options[0] : null,
            open: false
        }
    },

    methods: {
        imgSrc(name) {
            return '/img/check-in/' + name
        },
        abc(option) {
            this.selected = option
            this.open = false
            this.$emit('input', option)
        }
    },
    computed: {}
}
</script>

<style scoped lang="scss">
.custom-select {
    position: relative;
    width: 100%;
    /* text-align: left; */
    outline: none;
    line-height: 47px;
}

.custom-select .selected {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;
    font-family: Bold;
    display: flex;
    justify-content: space-between;
    padding: 12px;
    height: 50px;
    align-items: center;
}

.custom-select .items {
    color: #fff;
    border-radius: 0px 0px 6px 6px;
    overflow: hidden;
    position: absolute;
    background-color: #fff;
    top: 55px;
    left: 0;
    right: 0;
    z-index: 1;
    border-radius: 10px;
    padding: 10px;
}

.custom-select .items div {
    color: #333;
    padding-left: 1em;
    cursor: pointer;
    font-family: Bold;
    user-select: none;
    transition: all 0.2s;
    border-radius: 8px;
}

.custom-select .items div:hover {
    background-color: #e0e0e0;
}

.selectHide {
    display: none;
}

.flexxxx {
    display: flex;
    gap: 4px;

    div {
        font-family: Bold;
    }
}
</style>
