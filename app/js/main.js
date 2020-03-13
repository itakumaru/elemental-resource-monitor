const electron = require("electron");
const remote = electron.remote;
const os = require("os-utils");

let mainWindow = remote.getCurrentWindow();
mainWindow.setAlwaysOnTop(false);

const app = new Vue({
    el: "#app",
    data() {
        return {
            now: new Date(),
            lockIcon: "el-icon-unlock",
            cpu: 0,
            freeRam: os.freememPercentage(),
            colors: [
                { color: '#6f7ad3', percentage: 20 },
                { color: '#1989fa', percentage: 40 },
                { color: '#5cb87a', percentage: 60 },
                { color: '#e6a23c', percentage: 80 },
                { color: '#f56c6c', percentage: 100 }
            ]
        };
    },
    computed: {
        time() {
            let hour = this.now.getHours();
            let minute = this.now.getMinutes();
            let second = this.now.getSeconds();
            return `${ ("00" + hour).slice(-2) }:${ ("00" + minute).slice(-2) }:${ ("00" + second).slice(-2) }`;
        },
        cpuPercentage() {
            return Math.round(this.cpu * 100);
        },
        ramPercentage() {
            return Math.round((1 - this.freeRam) * 100);
        }
    },
    methods: {
        refresh() {
            this.now = new Date();
            this.freeRam = os.freememPercentage();
            const self = this;
            setTimeout(() => {
                self.refresh();
            }, 1000);
        },
        calcCpuUsage() {
            os.cpuUsage((v) => {
                this.cpu = v;
                this.calcCpuUsage();
            });
        },
        toggleAlwaysOnTop() {
            mainWindow.setAlwaysOnTop(mainWindow.isAlwaysOnTop() ? false : true);
            if (this.lockIcon == "el-icon-unlock") {
                this.lockIcon = "el-icon-lock";
            } else {
                this.lockIcon = "el-icon-unlock";
            }
        }
    },
    created() {
        this.refresh();
        this.calcCpuUsage();
    }
});
