import palette from './../services/colorPalette';

export const synthConfig = {

    config: {
        presets: {
            default: {
                name: 'default',
                active: true,
                masterVolume: {
                    max: 0.5,
                    min: 0.0,
                    value: 0.3,
                    savedValue: 0
                },
                octave: -1,
                oscillators: {
                    square: {
                        name: 'square',
                        active: true,
                        value: 0.4,
                    },
                    triangle: {
                        name: 'triangle',
                        active: true,
                        value: 0.05,
                    },
                    sawtooth: {
                        name: 'sawtooth',
                        active: true,
                        value: 0.08,
                    },
                    sine: {
                        name: 'sine',
                        active: true,
                        value: 0.10,
                    }
                },
                expression: {
                    modulation: {
                        name: 'modulation',
                        active: true,
                        value: 0.5
                    },
                    pitch: {
                        name: 'pitch',
                        active: true,
                        value: 0.5
                    }

                },
                envelope: {
                    attack: {
                        name: 'attack',
                        value: 0.1,
                        active: true,
                    },
                    decay: {
                        name: 'decay',
                        value: 0.2,
                        active: true,
                    },
                    sustain: {
                        name: 'sustain',
                        value: 0.2, 
                        active: true,
                    },
                    release: {
                        name: 'release',
                        value: 0.2,
                        active: true,
                    },
                }
            },
            fun: {
                name: 'fun',
                active: true,
                masterVolume: {
                    max: 0.5,
                    min: 0.0,
                    value: 0.3,
                    savedValue: 0
                },
                octave: -1,
                oscillators: {
                    square: {
                        name: 'square',
                        active: true,
                        value: 0.1,
                    },
                    triangle: {
                        name: 'triangle',
                        active: true,
                        value: 0.2,
                    },
                    sawtooth: {
                        name: 'sawtooth',
                        active: true,
                        value: 0.3,
                    },
                    sine: {
                        name: 'sine',
                        active: true,
                        value: 0.4,
                    }
                },
                expression: {
                    modulation: {
                        name: 'modulation',
                        active: true,
                        value: 0.5
                    },
                    pitch: {
                        name: 'pitch',
                        active: true,
                        value: 0.5
                    }

                },
                envelope: {
                    attack: {
                        name: 'attack',
                        value: 1,
                        active: true,
                    },
                    decay: {
                        name: 'decay',
                        value: 1,
                        active: true,
                    },
                    sustain: {
                        name: 'sustain',
                        value: 1, 
                        active: true,
                    },
                    release: {
                        name: 'release',
                        value: 1,
                        active: true,
                    },
                },
            }
        }
    },
    ui: {
        waveforms: [
            {
                name: 'square',
                knob: {
                    color: 'crimson',
                    img: {
                        active: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJRJREFUeNrs1sEKABAQQEHk/38ZRwcpkaR5N3ucbG0IkiQdLI6GpYVmgtbq3wnJfhAhQoQoiBBfK5+4k35r9U72E60zRIiCCBEiREGECBGiIEKECFEQIUKEKIgQIUIURIgQBREiRIiCCBEiREGECBGiIEKECFEQIUKEKIgQIUIURIgQBREiRIiCCBEiREGUJF2qCjAAVjUIkiGHVs8AAAAASUVORK5CYII=',
                        inactive: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAI5JREFUeNrs1jEKACAIQFGL7n9lu0BL5CDx/uj4UDBCkqTCxmGWWO7MJpP3IEKECFEQIXZrFf2WP5U20TlDhCiIECEKIkSIEAURIkSIgggRIkRBhAgRoiBChAhRECFChCiIECEKIkSIEAURIkSIgggRIkRBhAgRoiBChAhRECFChCiIECEKIkRJUtO2AAMAUwYCklsYAFMAAAAASUVORK5CYII='
                    },
                },
                slider: {
                    color: 'crimson',
                    direction: 'horizontal',
                }
            },
            {
                name: 'triangle',
                knob: {
                    color: 'darkcyan',
                    img: {
                        inactive: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAk9JREFUeNrsnNGNwjAQRF0CJbgESkgJKcElUAIdUAIlpISUQAkpgRK4+4gldEfI2Els7+6MZJ2EBJdM4n3xeME5iqIoSpI8Ldhu4EQjt2n4Ha/5L5WhfjYwjp6WpOk0T+N3E6f5dQrU9Y+BcVxpDQ6T15dByAAaV0wcaVEaTJYGIZMAk6VByCTC5EXIYDonGhjHmdbhMCFkVhQyDYwjECbOPTea+LQOmdtGA+O4ESbrFCZkNsAkRmADIZMHk+fbOtmDtdMMZFCYXDMexs1A5g4u6z4JWRbetRvYgZDoDnq/Cj12uJOQO/mh1cDLTjUNrakXqzC5FL4g6mDyqFAazMCk9OeqhYlpyBz9gJz74C5G6FJtK0VRyHiJJg4FpxpSMsT186BFf6/4Co3VREEGWePuHaQiAe9EmBiBDAqTcND/Dxog00ICnZKYm4eJOsigfTSlduVQyDQVUNSCiRrIeNdmOxzaptcEZJBCPvLY5F7tVmdJMkxq1x2kXleDTNMHJ+FiNz9NJJQdEQW75WMOTtCjQ8bsCSXqi+SkpIlFgYbMruryVEt6XDUoER0xtRDZBadrR827wuGx1r3dopBRtQFUAzJoEe6Emljk/FRuimdAJrvJwEoP4GFNo9a6UQ+5YSz2Re/aAqgdJkXO21Qb7xEz0GRD+Z4s8M7oVxsybyRf/HlJIWSGpuKhBpUV+3kg6rL27fa1zGBcmtL9wqLc4u8sLEFmcsAu5ulDTBScTQX3P+5LupniFLf+2zPjt6mbYqZlWT9/iqIoiqJs6keAAQBwQVUQkVajqAAAAABJRU5ErkJggg==',
                        active: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmhJREFUeNrsnIFtgzAQRcsGGYFukBEYISNkhIzABoyQETwCIzBCRiAbuFQlUquWcrbx2Xf3v4SqSiU1H+zHfS68vUEQBEGQJXnvW7iQaOCyPWBkmonOf8nBjTgDL/6nLnAlzMDTOo2/6/P3E9yhm9j7v9XDHTpM/hMgQzBx3DFxhEthMNkSIBMAky0BMoEw8YAMzcCzj9MZ7tFhAsjsGHj1abqWPoamNEyWH49lS4HEc9nem6Z5Wr0KB3+MBsBkh8KATBpM3Pq3DpCJg8n8qpPXenqWABnOymQOvZkmTuvZRCWzHOSdUtZt7EspC+/aDeyIkOhy7K/FxCn1SiJeyZNWA29HrGkBa+rNKkxunCdEI0wm7qXBDEy4P1ctTExDJvcNcuyNuyQDWw6KBkCmlWii45pqxCXDSTOw44yvAmK1TpKJlBp3OPh/DrE1uTmYqIdM6dwvNKeUDJMx8xhGsZDhhok6yAT00QxM4yFBpqqAorboXhxkCE2ZRdrhAtr02hpMHEvDROLYxJztWmdJDEz6wie6rxYyVQ9OwsmufppIWHZELNg1jzmgKbOtzETq7LlyrC9ik5IqigINmV3R8lRLelw0KBEdMdUQ2akIO39Dhi881vpslxUyqh4AlYCM9n4XluNT+VA8DjJT7Ieb6AHM1jRqrRs1ywVjsS/60BZAqx36hx63qTbeHDPQZEP5kSzgaspUBJmW935JJ2RcPfFQnSaGx37rVB6z1pDyjNzLDMatKX3ZKMptfAWWBpnH7lPMdefe5Jex93PUPrRqeU1x0++eeXmQFDhbf9UeXjUIQRAEQRL1IcAAJDbWWq/nONwAAAAASUVORK5CYII='
                    },
                },
                slider: {
                    color: 'darkcyan',
                    direction: 'horizontal',
                }
            },
            {
                name: 'sawtooth',
                knob: {
                    color: '#20dab8',
                    img: {
                        inactive: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZJJREFUeNrs3M1tgzAYgGFHWYBRMkpHYBQ26AgdKdduwbU3mlY5VApNTf3Z39/7Sj4ioUcWYLA4F2ruDAGIIIJIIIIIIoi00wmC7zac2nq7Iz4b9EtTJSCITwCvlYAgCgCCKAAIogAgiAKAIAoAbgC2A24AtgNuAP49WLEIABYQ2wFB/NHlNtZKwGXnLU56xCOA887x6RFbAdMjSgCmRpQCTIsoCZgSURowHWIPwFSIvQDTIPYETIHYGzA84lwJuDYAhkacK2ffep+tBUQ9wJCIowHDIWoAhkLUAgyDqAkYAlEb0D2iBUDXiFYA3SJaAnSJuBgDdIdYu73369vxNPC83CBaBXSDaBnQBaJ1QPOIHgBNI3oBNIvoCdAkojdAc4geAU0hegU0gTg5B1RHPLq91yKgKuJ/90eDGBBQBTEa4HDEiIBDEaMCDkOMDDgEMTpgd8QMgF0RswB2RXxNAqg+E5cSI7Vr4lzipHJ3jgSo8pwYDXD4iuWl0ENHfkL5cRvvkLUhEogggggigQiikz4FGACYbjINk5IrHwAAAABJRU5ErkJggg==',
                        active: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZVJREFUeNrs2+0NgjAQxvHKBI7CKI7gKG7gCLqJIziKI2BJ9IPGl0J7vbvnnn9C+KSQX5AKlJQYY4wxxhhjIm2iA0y5n0C5f98xBAc88Xe0Hm87A04FUes74HUqjGKVgERsAEjEBoBEbABIxAaApYgDMmBeXfIySm9rICARawHPHDXqzoGn57UzB5YKQCK+Ao55uRUCHt7v4oRHXAi4//D52Ii1gOERWwCGRmwFGBaxJWBIxNaA4RAlAEMhSgGGQZQEDIEoDQiPOKMUAt7WAkIjPgCnQsCxclt4iD0BIRF7A8IhagBCIWoBwiBqAkIgagO6R7QA6BrRCqBbREuALhHnJ22WAN0hlk7vfTw73nbcLx+IVgHdIFoGdIFoHdA8ogdA04heAM0iegI0iegN0ByiR0BTiF4BTSAuedHQIqA64tLpvRYBVRHXzo8mIiCgCiIaYHdERMCuiKiA3RCRAbsgogOKI0YAFEWMAiiNeIwAaOFIPCSANM+J+wSS1ugMA6j1PxEKUOOKwqcYY4wxxhhjxd0FGADL4+Bukn9zIgAAAABJRU5ErkJggg=='
                    },
                }, 
                slider: {
                    color: '#20dab8',
                    direction: 'horizontal',
                }
            },
            {
                name: 'sine',
                knob: {
                    color: 'deepskyblue',
                    img: {
                        inactive: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAv9JREFUeNrsnL1x20AQhUEocoYSUAI7MDogSkAJdOhMHaAEjTugM2eUM2dSB3QHkDM7os8eBAzE2SVu990DZ9/Mzkgihb1vcT+7wAFVFQqFQqFQKHR32iR7TPaW7DnZ68p5tsm6ZM38O4zrfGGnZMMKgzfMbT9fMXeu95weL84ms9q5rWeluXFdczjNw4N56E43BNCVS3LI2CMbYfie0VySwxfCIB4zAujCpXH4SBTAvUEAzbm03b8lWUgmwyCacT0pHT4RBPGWtsK5BqXDtnAv1LRxKMk1kvdGTc8aS3Np04aGtBeerrTNnevh4uffyX4l64X/+TPXo+gVuRO+8ynZj3f+XoTrpDjjaFm0CcqlycOQ5WCvaM+ejashW2CkBUVbwsG5NA1HaTIEh3JphlBPMpQ7Zi6pB4wEQ/nEzuUBYL0qj+xcmq7vuUpvjYdyMS6p6+8dgyilJBMLVy18fhA+3zkGcZfZNhouzVUQj1pak9P1a+HyhsmZtxoWLmk4vymK8o8OQZSO+Ty3balMuWrFd74Kn3cOQZSO+d3AB5RLk2q04GuH2xVyiSnBAFzMJjauWunsYDV/GMyHB0NfSK719Q5Crrudp0y4tMP5ZyXv8bNYzaTc7HVui5VMuOobHEp5lUWptMtswxIhuNZZRRBx3QyZM+kz1+mD1XD2LgG9Sz2a0nY11/iIuBalIEvmra7iv4puOh9L9z2W3LuVNh0x3M8xvSc9OnR9KACQKysl6Asej4UrexGg3ZUA5MoG1+Z0DbrhIC6z1dRqp1YHDOLWiMtsMaDbM+jFVWc4+6K4zDQIZV6b6cNDuVzmNWfuPuq2QBBzuNwm4uI7+oFci9RWK3i2BMTlftaKPeUE4oKdNfjzdgZcqucIH4yux20M87nPyb4RBPEf1wdwnvr/+eHcXnis+KThMk0Nch6jNU0bwFzmZRPNexmAXC4T8ktF8IYQhx55RAXxMh8s+q4aFNcGNBS6qsBbk8BcoVAoFAqFQqFQKBQKhUKh0L3rrwADAIO/0wltxCn+AAAAAElFTkSuQmCC', 
                        active: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA11JREFUeNrsnIGN6jAMhttMkBE6Ahs8NqAjMMKNcEyAmOD0NqATwE0AG3AbwAZ56Sl60kmUOI39Jz35lyokoLE/10mdNm3TqFQqlUqlUv06tc65d//58Nu5bdvrkmE8y8p/rP1mw1cYLvdTN79tFxi8bfB9SrJcE0ZPfrMLCF4XfKVKhuuFwXvoHtV23eBjqvi5CAZthQG0ke7roFwEg5cKg3hy+bogg+jCGbyWAL45Pr0jgzimf1fJieTOGEQeLt/IB9HgRwVBJPsK5wp1FkVd4SykaFuMyze0rzkbiZm1L8qVUDbYSrPw9sw3BJf5P4lu23GeuSPs81YgESlTtl1g+HlxoAQX4ajdCmRitk+SXObJd4fIPh1yOuht9aPNyN8OhKZwXGEMqeYEQzihkKZwcC6K48Ag3rnApbjMxPdDZD8buhmiK8ey7G9Ck1guQgbsK+jKtxq4zIvfjpF9e0BvXkd+P85oE8c1pjVhIF4JZuGKYH9dA9dkJvoidTxij8xMkczCh/fxnNqoBJfJTP2NYBA3Al0Zz0W8CmIFujKlpusXwSUNkzlu2Vq4TGT8+L75HWnjj0BXjrV5fnaxIWFcZOUyhP/EClSJk0uszU8GGzguYqnRMdrrEKUVJ5chpP4VXOpQSpvstTWcXIZo88g1fjCMh0dGWyxc1CDGxiDOM3Sf6UuKcFxLHKeQXIY4fnz5jyvH+JF55K/BFxZxcZkEm7G6imOqtMn0YY4QXMucRSC5ODMxdyDumXzgzsSobyZh/JCeAopO9SS5TKLNoWAmDo2cBkgmElN/1o2ecIXaFujKLFwmMfXHciBWYsw5m8X2+ZJ8jCKXy8ywKXGjpy+Yhdlcc4L4ydmlictEBkAQWbko4NWvSijNxQHuEtbH4BwX4jIz7VGWbmyJ/+FcJpKrAxMX+ahVvWYQyWUy7MUypHv1UGL4rasoC1m4JC4Y5K6j7gpk4mwuyYG47Ip+INdcY/U/WwLiQhy1Mk85gbiQRw37vB0PF+k5QpNrLNyn2DH6v+O8j5LJdUAfuQtDFp6aykTh4i4Nch6j5Ssb+EueOySIwWA972UAckkNyCldeylvPrFTr02QNFr2XTVArhbRFZoSb03Cc6lUKpVKpVKpVCqVSqVSqVS/Xf8EGACrDRwFDCXJ4wAAAABJRU5ErkJggg=='
                    }
                },
                slider: {
                    color: 'deepskyblue',
                    direction: 'horizontal',
                }
            }
        ],
        envelope: [
            {
                name: 'attack',
                slider: {
                    description: 'adjust time to attack.',
                    color: '#20dab8',
                    direction: 'vertical'
                }
            },
            {
                name: 'decay',
                slider: {
                    description: 'Adjust time taken to decay to sustain level.',
                    color: '#20dab8',
                    direction: 'vertical',
                }
            },
            {
                name: 'sustain',
                slider: {
                    description: 'adjust sustain level.',
                    color: '#20dab8',
                    direction: 'vertical'
                }
            },
            {
                name: 'release',
                slider: {
                    description: 'adjust time for sound to dissipate after releasing a key.',
                    color: '#20dab8',
                    direction: 'vertical'
                }
            }
        ],
        expression: {
            pitch: {
                name: 'pitch',
                slider: {
                    description: 'adjust pitch',
                    color: 'linear-gradient(black, deepskyblue, black)',
                    direction: 'vertical'
                }
            },
            modulation: {
                name: 'modulation',
                slider: {
                    description: 'adjust modulation amount',
                    color: 'linear-gradient(black, deepskyblue, black)',
                    direction: 'vertical'
                }
            }
        },
        keyboard: {
            blackKeys: [
                1, 3, 
                6, 8, 10,
                13,15,
                18, 20, 22,
            ] 
        },
        palette,
        leds: [
            { color: palette.red, octave: 2 },
            { color: palette.yellow, octave: 1 },
            { color: palette.lime, octave: 0 },
            { color: palette.yellow, octave: -1 },
            { color: palette.red, octave: -2 },
        ],
    }
};
