import {defineConfig, HeadConfig} from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Gander Site',
    description: 'Code solutions, tips and tricks.',
    srcDir: 'docs',
    cleanUrls: true,
    ignoreDeadLinks: true,
    lastUpdated: true,

    sitemap: {
        hostname: 'https://gander.pl',
    },

    async transformHead() {
        const scripts: HeadConfig[] = [];

        if (process.env.VITE_UMAMI_ID && process.env.VITE_UMAMI_SRC) {
            scripts.push([
                'script',
                {
                    'async': 'true',
                    'data-website-id': process.env.VITE_UMAMI_ID,
                    'src': process.env.VITE_UMAMI_SRC,
                },
            ]);
        }

        if (process.env.VITE_MEDAMA_SRC) {
            scripts.push([
                'script',
                {
                    'defer': 'true',
                    'src': process.env.VITE_MEDAMA_SRC,
                },
            ]);
        }

        return scripts;
    },
    head: [
        ['link', {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'}],
        ['link', {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'}],
        ['link', {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'}],
        ['link', {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
        ['link', {rel: 'manifest', href: '/site.webmanifest'}],
    ],

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        lastUpdated: {
            formatOptions: {
                dateStyle: 'short',
            },
        },

        sidebar: [
            {
                text: 'Services',
                items: [
                    {
                        text: 'IFTTT: Maker Webhooks',
                        link: '/solutions/services/ifttt-maker-webhooks',
                    },

                ],
            },
            {
                text: 'Self-Hosted',
                items: [
                    {
                        text: 'Sentry: Install & Backup',
                        link: '/solutions/self-hosted/sentry',
                        items: [
                            {
                                text: 'Feature Flags',
                                link: '/solutions/self-hosted/sentry/feature-flags',
                            },
                        ],
                    },
                    {
                        text: 'Fluentd: Docker Compose',
                        link: '/solutions/self-hosted/fluentd-docker-compose',
                    },
                ],
            },
            {
                text: 'Pimcore',
                items: [
                    {
                        text: 'Action Argument Resolving',
                        link: '/solutions/pimcore/action-argument-resolving',
                    },
                    {
                        text: 'Workflow Management',
                        link: '/solutions/pimcore/workflows',
                    },
                    {
                        text: 'Tinkerwell Driver',
                        link: '/solutions/pimcore/tinkerwell-driver',
                    },
                    {
                        text: 'ExtJS',
                        link: '/solutions/pimcore/ext-js',
                    },
                ],
            },
            {
                text: 'Tools / Projects',
                items: [
                    {
                        text: 'Buggregator',
                        link: '/tools/buggregator',
                    },
                    {
                        text: 'JetBrains',
                        items: [
                            {
                                text: 'PhpStorm: LightEdit',
                                link: '/tools/jet-brains/php-storm/light-edit',
                            },
                            {
                                text: 'File Watchers',
                                items: [
                                    {
                                        text: 'Macro Preview',
                                        link: '/tools/jet-brains/file-watchers/macro-preview',
                                    },
                                    {
                                        text: 'Using NVM',
                                        link: '/tools/jet-brains/file-watchers/using-nvm',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        text: 'GitHub',
                        items: [
                            {
                                text: 'Remove failed workflows',
                                link: '/tools/github/delete-failed-workflows-cli',
                            },
                        ],
                    },
                    {
                        text: 'Open Street Map',
                        items: [
                            {
                                text: 'OSM: Cheat Sheet',
                                link: 'https://wiki.openstreetmap.org/wiki/User:GanderPL',
                            },
                            {
                                text: 'JOSM: Install on Linux Mint',
                                link: '/tools/osm/josm/install-on-linux-mint',
                            },
                        ],
                    },
                    {
                        text: 'NMS Frigate Calc',
                        link: '/tools/nms-frigate-calc',
                    },

                ],
            },
            {
                text: 'Utils',
                items: [
                    {text: 'List', link: '/utils/'},
                ],
            },
            {
                text: 'Outdated:',
                items: [
                    {text: 'Debian CheatSheet', link: '/debian-cheatsheet'},
                    {text: 'Doctrine DebugStack with Symfony Console Table', link: '/doctrine-debugstack-with-symfony-console-table'},
                    {text: 'FFmpeg with NVIDIA Acceleration', link: '/ffmpeg-nvenc'},
                    {text: 'Git tricks', link: '/git-tricks'},
                    {text: 'Graylog Memory/Heap usage', link: '/graylog-memory-heap-usage'},
                    {text: 'How to connect to VPN with CLI password prompting', link: '/how-to-connect-to-vpn-with-cli-password-prompting'},
                    {text: 'How to resolve SAOError when using create-nuxt-app', link: '/how-to-resolve-saoerror-when-using-create-nuxt-app'},
                    {text: 'JSFiddle quick add predefined external resources', link: '/jsfiddle-quick-add-predefined-external-resources'},
                    {text: 'JetBrains Linux .desktop file', link: '/jetbrains-linux-desktop-file'},
                    {text: 'Linux Mint 20 NVIDIA Driver', link: '/linux-mint-20-nvidia-driver'},
                    {text: 'Linux reboot to EFI', link: '/linux-reboot-to-efi'},
                    {text: 'MATE Desktop Environment', link: '/mate-desktop-environment'},
                    {text: 'MySQL utf8 Default Charset', link: '/mysql-utf8-default-charset'},
                    {text: 'PhpStorm Inotify Watches Limit', link: '/phpstorm-inotify-watches-limit'},
                    {text: 'PhpStorm Plugins', link: '/phpstorm-plugins'},
                    {text: 'RegEx change chars case', link: '/regex-change-chars-case'},
                    {text: 'Scanning for btrfs file systems', link: '/scanning-for-btrfs-file-systems'},
                    {text: 'Set GRUB to remember recently selected os', link: '/set-grub-to-remember-recently-selected-os'},
                    {text: 'Signal Desktop Tray Icon', link: '/signal-desktop-tray-icon'},
                    {text: 'Symfony 5/6', link: '/symfony'},
                    {text: 'Take all registered jQuery Event Handlers', link: '/take-all-registered-jquery-event-handlers'},
                    {text: 'Transparent Delayed Screen Autolock', link: '/transparent-delayed-screen-autolock'},
                    {text: 'Windows 10 Auto LogIn', link: '/windows-10-auto-login'},
                    {text: 'Windows: Switch Display Output using command line and hot keys', link: '/windows-swich-display-output-using-command-line-and-hot-keys'},
                    {text: 'dconf-tools', link: '/dconf-tools'},
                    {text: 'jQuery getScript alternative', link: '/jquery-getscript-alternative'},
                    {text: '~/.ssh/config', link: '/ssh-config'},
                ],
            },
        ],

        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/gander',
            },
            {
                icon: {svg: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32px" height="38px" viewBox="-135 22 32 38" xml:space="preserve"><g><polygon fill="#BCBBBB" points="-108.5,56.2 -108.5,46.3 -105.2,46.3 -105.2,59.5 -135,59.5 -135,46.3 -131.7,46.3 -131.7,56.2"/><path fill="#F48024" d="M-128,45.4l16.2,3.4l0.7-3.2l-16.2-3.4L-128,45.4z M-125.9,37.6l15,7l1.4-3l-15-7L-125.9,37.6z M-121.7,30.2l12.7,10.6l2.1-2.5l-12.7-10.6L-121.7,30.2z M-113.5,22.4l-2.7,2l9.9,13.3l2.7-2L-113.5,22.4z M-128.4,52.9h16.6 v-3.3h-16.6V52.9z"/></g></svg>'},
                link: 'https://stackoverflow.com/users/4559414/gander',
            },
            {
                icon: 'linkedin',
                link: 'https://www.linkedin.com/in/adam-gasowski/',
            },
        ],

        editLink: {
            pattern: 'https://github.com/gander-pages/gander.pl/edit/master/docs/:path',
        },

        outline: 'deep',
    },
});
