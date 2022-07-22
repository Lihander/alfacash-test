import Vue from "vue";

export default Vue.extend({
    methods: {
        toTime(time: number) {
            const durmin = Math.floor(time / 60);
            const dursec = Math.floor(time - durmin * 60);
            if (dursec < 10) {
                return durmin + ":0" + dursec;
            }
            return durmin + ":" + dursec;
        }
    }
})
