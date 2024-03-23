<template>
    <div class="wrap-sumary">
        <div class="wrap-sumary-header">
            <div class="back" @click="backCheckin()">
                <img :src="imgSrc('back.svg')" alt="" />
                Back
            </div>
            <div style="font-family: Bold">Tổng kết OKRs</div>
        </div>
        <div class="wrap-sumary-body">
            <div class="wrap-sumary-body-left">
                <div class="header">
                    <div style="font-family: Bold">{{ object_kr.object }}</div>
                </div>
                <div class="data">
                    <table id="data" style="width: 100%; max-height: calc(100% - 73px)">
                        <tr style="height: 34px; background: #c8e7f1">
                            <th>Kết quả chính</th>
                            <th>Mục tiêu</th>
                            <th>Kết quả</th>
                            <th>Tiến độ</th>
                            <th>Đánh giá</th>
                        </tr>
                        <tr class="data-data" v-for="(item, index) in list_kr" :key="index">
                            <td>{{ item.key_results }}</td>
                            <td>1 quy trình</td>
                            <td>1 quy trình</td>
                            <td>{{ item.original_percent_kr }}%</td>
                            <td class="flex-center">
                                <div class="evaluate flex-center">1</div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="wrap-sumary-body-right">
                <div id="chart" style="margin-top: 15px">
                    <apexchart v-if="canader" type="line" height="380" :options="tab.chartOptions" :series="tab.series"></apexchart>
                </div>
            </div>
        </div>
        <div class="wrap-sumary-footer">
            <div class="wrap-sumary-footer-container">
                <div style="color: #ccc; font-family: semibold">TỰ ĐÁNH GIÁ</div>
                <div class="flex-gap">
                    <div class="flex-colum">
                        <div>Tôi đã hoàn thành mục tiêu của mình chưa?</div>
                        <div class="input-text">
                            <input type="text" placeholder="Nhập nội dung...." />
                        </div>
                    </div>
                    <div class="flex-colum">
                        <div>Nếu đã hoàn thành, điều gì đã góp phần vào thành công?</div>
                        <div class="input-text">
                            <input type="text" placeholder="Nhập nội dung...." />
                        </div>
                    </div>
                    <div class="flex-colum">
                        <div>Nếu chưa, tôi đã gặp phải những trở ngại gì?</div>
                        <div class="input-text">
                            <input type="text" placeholder="Nhập nội dung...." />
                        </div>
                    </div>
                    <div class="flex-colum">
                        <div>Mục tiêu khó hơn hay dễ đạt được hơn bạn nghĩ khi đặt ra?</div>
                        <div class="input-text">
                            <input type="text" placeholder="Nhập nội dung...." />
                        </div>
                    </div>
                    <div class="flex-colum">
                        <div>Nếu tôi viết lại OKRs này, tôi sẽ thay đổi điều gì?</div>
                        <div class="input-text">
                            <input type="text" placeholder="Nhập nội dung...." />
                        </div>
                    </div>
                    <div class="flex-colum">
                        <div>Tôi đã học được gì có thể thay đổi cách tiếp cận cảu tôi đối với OKRs chu kỳ tiếp theo</div>
                        <div class="input-text">
                            <input type="text" placeholder="Nhập nội dung...." />
                        </div>
                    </div>
                    <div style="color: #ccc; font-family: semibold">PHẢN HỒI HƯỚNG LÊN</div>
                    <div class="flex-colum">
                        <div>Bạn nhận được gì từ người quản lý mà bạn thấy hữu ích</div>
                        <div class="input-text">
                            <input type="text" placeholder="Nhập nội dung...." />
                        </div>
                    </div>
                    <div class="flex-colum">
                        <div>Diều gì từ người quản lý đã cản trở khả năng làm việc của bạn</div>
                        <div class="input-text">
                            <input type="text" placeholder="Nhập nội dung...." />
                        </div>
                    </div>
                    <div class="flex-colum">
                        <div>Người quản lý có thể làm gì cho bạn để giúp bạn thành công hơn</div>
                        <div class="input-text">
                            <input type="text" placeholder="Nhập nội dung...." />
                        </div>
                    </div>
                    <div style="color: #ccc; font-family: semibold">PHÁT TRIỂN NGHỀ NGHIỆP</div>
                    <div class="flex-colum">
                        <div>Các kỹ năng, năng lực tôi muốn cải thiện hiện tại</div>
                        <div class="input-text">
                            <input type="text" placeholder="Nhập nội dung...." />
                        </div>
                    </div>
                    <div class="flex-colum">
                        <div>Các kỹ năng, năng lực nghĩ mình muốn bổ sung trong tương lai</div>
                        <div class="input-text">
                            <input type="text" placeholder="Nhập nội dung...." />
                        </div>
                    </div>
                    <div class="flex-colum">
                        <div>Điều Công ty, nhóm có thể giúp tôi phát triển hơn nữa trong nghề nghiệp là</div>
                        <div class="input-text">
                            <input type="text" placeholder="Nhập nội dung...." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    props: {
        id: {
            type: Number,
            default: 0
        }
    },
    emits: ['close'],

    data() {
        return {
            list_kr: [],
            object_kr: {},
            tab: {
                series: [
                    {
                        name: 'Tiến độ',
                        data: []
                    }
                ],
                chartOptions: {
                    chart: {
                        height: 450,
                        type: 'line',
                        zoom: {
                            enabled: false
                        },
                        brush: {
                            enabled: false,
                            target: undefined,
                            autoScaleYaxis: false
                        },
                        background: '#FFF',
                        fontFamily: 'Medium',
                        foreColor: '#828282'
                    },
                    dataLabels: {
                        enabled: false
                    },
                    markers: {
                        size: 5
                    },
                    stroke: {
                        width: 2,
                        curve: 'straight'
                    },
                    theme: {
                        mode: 'light',
                        palette: 'palette1',
                        monochrome: {
                            enabled: true,
                            color: '#27AE60',
                            shadeTo: 'light',
                            shadeIntensity: 0.65
                        }
                    },
                    toolbar: {
                        show: false
                    },
                    export: {
                        show: false
                    },
                    tooltip: {
                        show: false
                    },
                    grid: {
                        row: {},
                        yaxis: {
                            lines: {
                                show: false
                            }
                        }
                    },
                    xaxis: {
                        categories: [],
                        lines: {
                            show: false
                        },
                        axisBorder: {
                            show: false
                        }
                    },
                    yaxis: {
                        show: false,
                        lines: {
                            show: false
                        }
                    }
                }
            },
            history_checkin: [],
            canader: false
        }
    },
    methods: {
        imgSrc(name) {
            return '/img/summary/' + name
        },
        async getListKr() {
            let res = await this.$api({
                url: '/list-kr',
                method: 'POST',
                data: {
                    object_id: this.id
                }
            })
            this.list_kr = res.data_kr
            this.object_kr = res.object
        },
        async getHistory() {
            let res = await this.$api({
                url: '/history-checkin-obj',
                method: 'POST',
                data: {
                    object_id: this.id
                }
            })
            this.canader = true
            if (res.success) {
                this.tab.series[0].data = []
                res.data.map(item => {
                    this.tab.series[0].data.push(Number(item.progress))
                    this.tab.chartOptions.xaxis.categories.push(moment(item.created_at).format('DD-MM'))
                })
            }
        },
        backCheckin() {
            this.$emit('close')
        }
    },
    created() {
        this.getListKr()
        this.getHistory()
    }
}
</script>

<style lang="scss">
.wrap-sumary {
    height: 100%;
    overflow: auto;

    &-header {
        padding: 28px 0 28px 26px;

        .back {
            display: flex;
            align-items: center;
            gap: 4px;
            font-family: Bold;
            margin-bottom: 20px;
            cursor: pointer;
        }
    }
    &-body {
        display: flex;
        gap: 20px;
        padding: 0 26px;

        &-left {
            width: 70%;
            height: 400px;
            background: #fff;
            border-radius: 12px;

            .header {
                padding: 25px 80px 18px 40px;
            }
            #data {
                border-collapse: collapse;

                th:first-child,
                td:first-child {
                    padding: 0 0 0 40px;
                    width: 50%;
                }

                th:last-child,
                td:last-child {
                    text-align: center;
                }

                th {
                    color: #2d9cdb;
                    font-family: Bold;
                    text-align: start;
                }

                td {
                    height: 60px;
                }

                .evaluate {
                    height: 37px;
                    width: 41px;
                    border: 1px solid #e0e0e0;
                    border-radius: 6px;
                }
            }
        }

        &-right {
            width: 30%;
            height: 400px;
            background: #fff;
            border-radius: 12px;
        }
    }
    &-footer {
        padding: 20px 26px;
        width: 100%;

        &-container {
            background: #fff;
            height: 100%;
            border-radius: 12px;
            padding: 25px 40px;

            .flex-gap {
                display: flex;
                flex-direction: column;
                gap: 30px;
            }

            .flex-colum {
                display: flex;
                flex-direction: column;
                gap: 10px;

                &:nth-child(1) {
                    margin-top: 20px;
                }
            }

            .input-text {
                width: 100%;
                border: 1px solid #ccc;
                border-radius: 14px;
                height: 70px;

                input {
                    width: 100%;
                    padding: 12px;
                    border-radius: 14px;
                    height: 100%;
                }
            }
        }
    }
}
</style>
