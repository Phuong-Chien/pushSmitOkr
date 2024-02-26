<template>
    <div class="wrapper">
        <div class="menu">
            <div class="menu-shared">
                <router-link class="menu-shared-item" :to="item.to" v-for="(item, index) in menu" :key="index">
                    <div class="item-img"></div>
                    <div class="name">{{ item.title }}</div>
                </router-link>
            </div>
        </div>
        <div class="router-view">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menu: [
                {
                    title: 'Okrs',
                    icon: 'okrmenu.svg',
                    to: '/'
                },
                {
                    title: 'Check-in',
                    to: '/check-in'
                },
                {
                    title: 'Phản hồi',
                    to: '/feedback'
                },
                {
                    title: 'Công việc',
                    to: '/job'
                }
            ]
        }
    },
    methods: {
        imgSrc(name) {
            return '/img/menu/' + name
        }
    }
}
</script>

<style lang="scss">
@import './assets/reset.css';
$url: '/img/menu/';

.wrapper {
    display: flex;
    height: 100vh;
    width: 100vw;
}

.menu {
    width: 107px;
    height: 100%;
    background: #2d9cdb;

    &-shared {
        text-align: center;
        gap: 10px;
        height: 100%;
        padding: 20px 15px;
        display: flex;
        flex-direction: column;

        .router-link-active {
            color: #2d9cdb;
            background: #fff;
            align-items: center;
            box-shadow: 0px 4px 29px 0px rgba(255, 255, 255, 0.59);

            &:hover {
                background: #fff;
            }

            .item-img {
                background: #2d9cdb;
            }
        }

        &-item {
            height: 72px;
            width: 76px;
            color: #fff;
            border-radius: 8px;
            gap: 10px;
            transition: all 0.2s;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &:hover {
                background: #ffffff21;
            }

            .item-img {
                margin-top: 10px;
                background: #fff;
                width: 19px;
                height: 17px;
                -webkit-mask-image: url($url + 'check-in.svg');
            }
            .name {
                font-family: Regular;
                font-size: 14px;
            }
        }
    }
}

.router-view {
    width: 100%;
    height: 100vh;
    background: #f0fbff;
}
</style>
