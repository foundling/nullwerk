webpackJsonp([2,0],[function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var a=n(11),o=i(a),s=n(105),r=i(s);new o.default({el:"#app",components:{App:r.default},render:function(e){return e(r.default)}})},,,,,,function(e,t){"use strict";function n(e,t){for(var n in t)t.hasOwnProperty(n)&&t[n]&&(e[n]=t[n]);return e}function i(e,t){var n=getComputedStyle(e)[t].replace("px","");return parseFloat(n)}function a(){var e=window,t=document,n=t.documentElement,i=t.getElementsByTagName("body")[0],a=e.innerWidth||n.clientWidth||i.clientWidth;return a}function o(){var e=window,t=document,n=t.documentElement,i=t.getElementsByTagName("body")[0],a=e.innerHeight||n.clientHeight||i.clientHeight;return a}Object.defineProperty(t,"__esModule",{value:!0});var s=console.log,r={localStorageNotSupported:"Local Storage is Not Supported in Your Browser."};t.errorMessages=r,t.getScreenWidth=a,t.getScreenHeight=o,t.log=s,t.merge=n,t.toComputed=i},,,,,,,,,,,,,,,function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.PresetManager=t.Keyboard=t.Wheel=t.Slider=t.LED=t.Knob=t.Key=t.Btn=void 0;var a=n(106),o=i(a),s=n(37),r=i(s),c=n(107),l=i(c),u=n(108),d=i(u),f=n(109),v=i(f),h=n(110),p=i(h),g=n(111),m=i(g),A=n(112),y=i(A);t.Btn=o.default,t.Key=r.default,t.Knob=d.default,t.LED=v.default,t.Slider=m.default,t.Wheel=y.default,t.Keyboard=l.default,t.PresetManager=p.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.screenWidthMixin=void 0;var i=n(6),a={data:function(){return{screenDimensions:null}},methods:{updateScreenDimensions:function(){this.screenDimensions={width:(0,i.getScreenWidth)(),height:(0,i.getScreenHeight)()}}},created:function(){this.updateScreenDimensions(),window.addEventListener("resize",this.updateScreenDimensions.bind(this))},onDestroy:function(){window.removeEventListener("resize",this.updateScreenDimensions)}};t.screenWidthMixin=a},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={red:"red",yellow:"yellow",lime:"lime",black:"rgb(40,40,40)",white:"whitesmoke",blue:"blue",brown:"brown",cyan:"darkcyan"};t.default=n},,,,,,,,,,,,,,function(e,t,n){var i,a;n(91),i=n(40);var o=n(117);a=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(a=i=i.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(50);t.default={name:"App",components:{Synthesizer:i.Synthesizer,Sequencer:i.Sequencer}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"Btn",props:["label","backgroundColor","diameter","width","height","border"],computed:{buttonStyle:function(){return{backgroundColor:this.backgroundColor,borderRadius:this.diameter?this.diameter+"%":"none",width:this.width?this.width+"%":this.diameter+"%",height:this.height?this.height+"%":this.diameter+"%"}},buttonLabelStyle:function(){return{width:this.diameter,height:this.diameter,borderRadius:"50%"}}},methods:{press:function(){this.$emit("press")}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(25),o=i(a),s=(n(6),n(22));t.default={name:"Key",components:{},mixins:[s.screenWidthMixin],data:function(){return{keyboardDirection:null,active:!1,keyWidthPercent:{white:100/15,black:100/15/2}}},props:["index","blackKeys"],created:function(){this.keyboardDirection=this.screenDimensions.width>=500?"horizontal":"vertical"},methods:{updateKeyboardDimensions:function(){this.keyboardDirection=this.screenDimensions.width>=500?"horizontal":"vertical"},startNote:function(e){this.active=!0,this.$emit("noteon",{index:e})},stopNote:function(e){this.active=!1,this.$emit("noteoff",{index:e})}},computed:{isActive:function(){return this.active},isBlackKey:function(){return this.blackKeys.includes(this.index)},offset:function e(){var t=this,n=[].concat((0,o.default)(Array(this.index).keys())).filter(function(e){return!t.blackKeys.includes(e)}).length,e=n*this.keyWidthPercent.white-this.keyWidthPercent.black/2;return e+"%"},classData:function(){return{"black-key":this.isBlackKey,"white-key":!this.isBlackKey,"active-key":this.active}},styleData:function(){var e={};return this.isBlackKey?("horizontal"===this.keyboardDirection&&(e.top=null,e.left=this.offset),"vertical"===this.keyboardDirection&&(e.top=this.offset,e.left=null),e):e}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(37),o=i(a);t.default={name:"Keyboard",data:function(){return{blackKeys:[1,3,6,8,10,13,15,18,20,22]}},components:{Key:o.default}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"Knob",props:{active:{type:Boolean,default:!1},diameter:String,toggleable:Boolean,color:String,bgImageActive:String,bgImageInactive:String,width:String,waveform:String},computed:{styleData:function(){return{backgroundImage:"url("+(this.active?this.bgImageActive:this.bgImageInactive)+")",backgroundColor:this.active?this.color:"white"}}},data:function(){return{}},methods:{toggleActive:function(){this.$emit("toggle",{waveform:this.waveform})}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"LED",props:["color","octave","currentOctave","diameter"],computed:{isActive:function(){return this.octave===this.currentOctave}},methods:{}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(11);i(a);t.default={components:{},props:{presetData:{type:Object}},data:function(){return{state:"select",inputValue:"",selected:this.presetData.currentPresetName}},methods:{newPreset:function(){this.$emit("NEW_PRESET",{name:this.inputValue.trim()}),this.inputValue="",this.state="select"},changePreset:function(e){return"new"===this.selected?void(this.state="new"):void this.$emit("CHANGE_PRESET",{name:this.selected})},cancelSave:function(){this.selected="default",this.state="select"},updatePreset:function(){this.$emit("UPDATE_PRESET",{name:this.presetData.currentPresetName})}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(11),o=i(a),s=n(126),r=i(s),c=n(6),l=n(22);o.default.use(r.default),t.default={name:"Slider",data:function(){return{styleData:null,slideData:{position:null,lastDelta:0}}},props:{sticky:{type:Boolean,default:!1},name:{type:String},opacity:{type:Number,default:1},content:{type:String},controlSource:{type:Object},direction:{type:String,validator:function(e){return["horizontal","vertical"].includes(e)}},fontColor:{type:String},color:{type:String}},created:function(){this.styleData=this.buildStyleData()},mounted:function(){this.initSliderPosition()},mixins:[l.screenWidthMixin],methods:{initSliderPosition:function(){var e="horizontal"===this.direction?"width":"height",t="horizontal"===this.direction?1:-1,n=this.$el,i=n.parentNode,a=(0,c.toComputed)(n,e),o=(0,c.toComputed)(i,e),s=o-a,r=this.controlSource.value,l=r*s;this.slideData.position=l,this.styleData.bar.transform="translate"+this.axis+"("+t*l+"px)"},updateControlSourceValue:function(){var e="horizontal"===this.direction?"width":"height",t=this.$el,n=t.parentNode,i=(0,c.toComputed)(t,e),a=(0,c.toComputed)(n,e),o=a-i,s=this.slideData.position/o;this.$emit("slide",{name:this.controlSource.name,value:s})},moveSlider:function(e){var t="horizontal"===this.direction?"width":"height",n="horizontal"===this.direction?1:-1,i=e.target,a=(0,c.toComputed)(i,t),o=e.target.parentNode,s=(0,c.toComputed)(o,t),r=0,l=s-a,u=n*e["delta"+this.axis],d=u-this.slideData.lastDelta,f=this.slideData.position+d;f>l?this.slideData.position=l:f<r?this.slideData.position=r:this.slideData.position=f,this.styleData.bar.transform="translate"+this.axis+"("+n*this.slideData.position+"px)",this.slideData.lastDelta=u,this.updateControlSourceValue()},moveSliderEnd:function(e){this.sticky&&this.initSliderPosition(),this.slideData.lastDelta=0,this.$emit("slideend",{name:this.controlSource.name,value:.5})},buildStyleData:function(){var e={bar:{display:this.controlSource.active?"flex":"none",height:"horizontal"===this.direction?"100%":"10%",width:"horizontal"===this.direction?"10%":"100%",background:this.color,color:this.fontColor,opacity:this.opacity,left:"0px",bottom:"0px",transform:"none"}};return e}},watch:{screenDimensions:function(){this.initSliderPosition()},controlSource:function(){this.initSliderPosition()}},computed:{sliderPosition:function(){return"translate"+this.axis+"("+this.slideData.position+"px)"},abbreviatedLabel:function(){return this.content.charAt(0).toUpperCase()},barStyle:function(){return this.styleData.bar},axis:function(){return"horizontal"===this.direction?"X":"Y"}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"Wheel",props:[],computed:{},methods:{}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(25),o=i(a),s=n(21),r=n(53),c=i(r);new c.default;t.default={name:"Sequencer",data:function(){return{steps:[].concat((0,o.default)(Array(8).keys())),preset:{color:"white"}}},props:{},components:{Btn:s.Btn,LED:s.LED},methods:{togglePlay:function(){console.log("toggle play")},togglePause:function(){console.log("toggle pause")},toggleStop:function(){console.log("toggle stop")},toggleRecord:function(){console.log("toggle record")},dispatcher:function(){var e="toggle"+this.sequencer.mode[0].toUpperCase()+this.sequencer.mode.slice(1);this[e]()}}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(100),o=i(a),s=n(21),r=n(23),c=i(r),l=n(49),u=n(52),d=i(u),f=n(51),v=i(f),h=l.synthConfig.ui,p=l.synthConfig.config,g=new v.default({defaults:p}),m=new d.default({config:g.currentPreset});t.default={name:"Synthesizer",data:function(){return{ui:h,palette:c.default,localStorage:g,soundEngine:m}},created:function(){},mounted:function(){document.addEventListener("load",function(){o.default.attach(document.body)})},methods:{toggleMasterVol:function(){this.soundEngine.active=!this.soundEngine.active},toggleOscillatorVol:function(e){var t=e.waveform,n=this.soundEngine.settings.oscillators[t];n.active=!n.active},adjustOscillatorPitch:function(e){var t=e.value;if(this.soundEngine.oscillators){var n=t-.5,i=this.soundEngine.oscillators,a=this.soundEngine.oscillators[0].osc.frequency.value,o=2*a-a/2;i.forEach(function(e){e.osc.frequency.value=e.osc.frequency.originalFrequency+n*o})}},adjustOctave:function(e){this.soundEngine.octave+=e},adjustOscillatorVolume:function(e){var t=e.name,n=e.value;this.soundEngine.settings.oscillators[t].value=n},setEnvelopeValue:function(e){var t=e.name,n=e.value;this.soundEngine.settings.envelope[t].value=n},noteOn:function(e){var t=e.index;this.soundEngine.playNote(t),console.log(this.soundEngine.oscillators[0].osc.frequency.abc=!0)},noteOff:function(e){e.index;this.soundEngine.noteOff()},updatePreset:function(e){var t=e.name,n=this.localStorage.data.currentPreset;this.localStorage.savePreset(t,n)},changePreset:function(e){var t=e.name;this.localStorage.changePreset(t)},newPreset:function(e){var t=e.name,n=this.localStorage.data.currentPreset;this.localStorage.savePreset(t,n)}},watch:{"localStorage.data":function(){this.soundEngine.settings=this.localStorage.currentPreset}},filters:{abbreviate:function(e){return e.charAt(0).toUpperCase()}},components:{Btn:s.Btn,Key:s.Key,Knob:s.Knob,LED:s.LED,PresetManager:s.PresetManager,Slider:s.Slider,Wheel:s.Wheel}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.synthConfig=void 0;var a=n(23),o=i(a);t.synthConfig={config:{presets:{default:{name:"default",active:!0,masterVolume:{max:.5,min:0,value:.3,savedValue:0},octave:-1,oscillators:{square:{name:"square",active:!0,value:.4},triangle:{name:"triangle",active:!0,value:.05},sawtooth:{name:"sawtooth",active:!0,value:.08},sine:{name:"sine",active:!0,value:.1}},expression:{modulation:{name:"modulation",active:!0,value:.5},pitch:{name:"pitch",active:!0,value:.5}},envelope:{attack:{name:"attack",value:.1,active:!0},decay:{name:"decay",value:.2,active:!0},sustain:{name:"sustain",value:.2,active:!0},release:{name:"release",value:.2,active:!0}}},fun:{name:"fun",active:!0,masterVolume:{max:.5,min:0,value:.3,savedValue:0},octave:-1,oscillators:{square:{name:"square",active:!0,value:.1},triangle:{name:"triangle",active:!0,value:.2},sawtooth:{name:"sawtooth",active:!0,value:.3},sine:{name:"sine",active:!0,value:.4}},expression:{modulation:{name:"modulation",active:!0,value:.5},pitch:{name:"pitch",active:!0,value:.5}},envelope:{attack:{name:"attack",value:1,active:!0},decay:{name:"decay",value:1,active:!0},sustain:{name:"sustain",value:1,active:!0},release:{name:"release",value:1,active:!0}}}}},ui:{waveforms:[{name:"square",knob:{color:"crimson",img:{active:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJRJREFUeNrs1sEKABAQQEHk/38ZRwcpkaR5N3ucbG0IkiQdLI6GpYVmgtbq3wnJfhAhQoQoiBBfK5+4k35r9U72E60zRIiCCBEiREGECBGiIEKECFEQIUKEKIgQIUIURIgQBREiRIiCCBEiREGECBGiIEKECFEQIUKEKIgQIUIURIgQBREiRIiCCBEiREGUJF2qCjAAVjUIkiGHVs8AAAAASUVORK5CYII=",inactive:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAI5JREFUeNrs1jEKACAIQFGL7n9lu0BL5CDx/uj4UDBCkqTCxmGWWO7MJpP3IEKECFEQIXZrFf2WP5U20TlDhCiIECEKIkSIEAURIkSIgggRIkRBhAgRoiBChAhRECFChCiIECEKIkSIEAURIkSIgggRIkRBhAgRoiBChAhRECFChCiIECEKIkRJUtO2AAMAUwYCklsYAFMAAAAASUVORK5CYII="}},slider:{color:"crimson",direction:"horizontal"}},{name:"triangle",knob:{color:"darkcyan",img:{inactive:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAk9JREFUeNrsnNGNwjAQRF0CJbgESkgJKcElUAIdUAIlpISUQAkpgRK4+4gldEfI2Els7+6MZJ2EBJdM4n3xeME5iqIoSpI8Ldhu4EQjt2n4Ha/5L5WhfjYwjp6WpOk0T+N3E6f5dQrU9Y+BcVxpDQ6T15dByAAaV0wcaVEaTJYGIZMAk6VByCTC5EXIYDonGhjHmdbhMCFkVhQyDYwjECbOPTea+LQOmdtGA+O4ESbrFCZkNsAkRmADIZMHk+fbOtmDtdMMZFCYXDMexs1A5g4u6z4JWRbetRvYgZDoDnq/Cj12uJOQO/mh1cDLTjUNrakXqzC5FL4g6mDyqFAazMCk9OeqhYlpyBz9gJz74C5G6FJtK0VRyHiJJg4FpxpSMsT186BFf6/4Co3VREEGWePuHaQiAe9EmBiBDAqTcND/Dxog00ICnZKYm4eJOsigfTSlduVQyDQVUNSCiRrIeNdmOxzaptcEZJBCPvLY5F7tVmdJMkxq1x2kXleDTNMHJ+FiNz9NJJQdEQW75WMOTtCjQ8bsCSXqi+SkpIlFgYbMruryVEt6XDUoER0xtRDZBadrR827wuGx1r3dopBRtQFUAzJoEe6Emljk/FRuimdAJrvJwEoP4GFNo9a6UQ+5YSz2Re/aAqgdJkXO21Qb7xEz0GRD+Z4s8M7oVxsybyRf/HlJIWSGpuKhBpUV+3kg6rL27fa1zGBcmtL9wqLc4u8sLEFmcsAu5ulDTBScTQX3P+5LupniFLf+2zPjt6mbYqZlWT9/iqIoiqJs6keAAQBwQVUQkVajqAAAAABJRU5ErkJggg==",active:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmhJREFUeNrsnIFtgzAQRcsGGYFukBEYISNkhIzABoyQETwCIzBCRiAbuFQlUquWcrbx2Xf3v4SqSiU1H+zHfS68vUEQBEGQJXnvW7iQaOCyPWBkmonOf8nBjTgDL/6nLnAlzMDTOo2/6/P3E9yhm9j7v9XDHTpM/hMgQzBx3DFxhEthMNkSIBMAky0BMoEw8YAMzcCzj9MZ7tFhAsjsGHj1abqWPoamNEyWH49lS4HEc9nem6Z5Wr0KB3+MBsBkh8KATBpM3Pq3DpCJg8n8qpPXenqWABnOymQOvZkmTuvZRCWzHOSdUtZt7EspC+/aDeyIkOhy7K/FxCn1SiJeyZNWA29HrGkBa+rNKkxunCdEI0wm7qXBDEy4P1ctTExDJvcNcuyNuyQDWw6KBkCmlWii45pqxCXDSTOw44yvAmK1TpKJlBp3OPh/DrE1uTmYqIdM6dwvNKeUDJMx8xhGsZDhhok6yAT00QxM4yFBpqqAorboXhxkCE2ZRdrhAtr02hpMHEvDROLYxJztWmdJDEz6wie6rxYyVQ9OwsmufppIWHZELNg1jzmgKbOtzETq7LlyrC9ik5IqigINmV3R8lRLelw0KBEdMdUQ2akIO39Dhi881vpslxUyqh4AlYCM9n4XluNT+VA8DjJT7Ieb6AHM1jRqrRs1ywVjsS/60BZAqx36hx63qTbeHDPQZEP5kSzgaspUBJmW935JJ2RcPfFQnSaGx37rVB6z1pDyjNzLDMatKX3ZKMptfAWWBpnH7lPMdefe5Jex93PUPrRqeU1x0++eeXmQFDhbf9UeXjUIQRAEQRL1IcAAJDbWWq/nONwAAAAASUVORK5CYII="}},slider:{color:"darkcyan",direction:"horizontal"}},{name:"sawtooth",knob:{color:"#20dab8",img:{inactive:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZJJREFUeNrs3M1tgzAYgGFHWYBRMkpHYBQ26AgdKdduwbU3mlY5VApNTf3Z39/7Sj4ioUcWYLA4F2ruDAGIIIJIIIIIIoi00wmC7zac2nq7Iz4b9EtTJSCITwCvlYAgCgCCKAAIogAgiAKAIAoAbgC2A24AtgNuAP49WLEIABYQ2wFB/NHlNtZKwGXnLU56xCOA887x6RFbAdMjSgCmRpQCTIsoCZgSURowHWIPwFSIvQDTIPYETIHYGzA84lwJuDYAhkacK2ffep+tBUQ9wJCIowHDIWoAhkLUAgyDqAkYAlEb0D2iBUDXiFYA3SJaAnSJuBgDdIdYu73369vxNPC83CBaBXSDaBnQBaJ1QPOIHgBNI3oBNIvoCdAkojdAc4geAU0hegU0gTg5B1RHPLq91yKgKuJ/90eDGBBQBTEa4HDEiIBDEaMCDkOMDDgEMTpgd8QMgF0RswB2RXxNAqg+E5cSI7Vr4lzipHJ3jgSo8pwYDXD4iuWl0ENHfkL5cRvvkLUhEogggggigQiikz4FGACYbjINk5IrHwAAAABJRU5ErkJggg==",active:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZVJREFUeNrs2+0NgjAQxvHKBI7CKI7gKG7gCLqJIziKI2BJ9IPGl0J7vbvnnn9C+KSQX5AKlJQYY4wxxhhjIm2iA0y5n0C5f98xBAc88Xe0Hm87A04FUes74HUqjGKVgERsAEjEBoBEbABIxAaApYgDMmBeXfIySm9rICARawHPHDXqzoGn57UzB5YKQCK+Ao55uRUCHt7v4oRHXAi4//D52Ii1gOERWwCGRmwFGBaxJWBIxNaA4RAlAEMhSgGGQZQEDIEoDQiPOKMUAt7WAkIjPgCnQsCxclt4iD0BIRF7A8IhagBCIWoBwiBqAkIgagO6R7QA6BrRCqBbREuALhHnJ22WAN0hlk7vfTw73nbcLx+IVgHdIFoGdIFoHdA8ogdA04heAM0iegI0iegN0ByiR0BTiF4BTSAuedHQIqA64tLpvRYBVRHXzo8mIiCgCiIaYHdERMCuiKiA3RCRAbsgogOKI0YAFEWMAiiNeIwAaOFIPCSANM+J+wSS1ugMA6j1PxEKUOOKwqcYY4wxxhhjxd0FGADL4+Bukn9zIgAAAABJRU5ErkJggg=="}},slider:{color:"#20dab8",direction:"horizontal"}},{name:"sine",knob:{color:"deepskyblue",img:{inactive:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAv9JREFUeNrsnL1x20AQhUEocoYSUAI7MDogSkAJdOhMHaAEjTugM2eUM2dSB3QHkDM7os8eBAzE2SVu990DZ9/Mzkgihb1vcT+7wAFVFQqFQqFQKHR32iR7TPaW7DnZ68p5tsm6ZM38O4zrfGGnZMMKgzfMbT9fMXeu95weL84ms9q5rWeluXFdczjNw4N56E43BNCVS3LI2CMbYfie0VySwxfCIB4zAujCpXH4SBTAvUEAzbm03b8lWUgmwyCacT0pHT4RBPGWtsK5BqXDtnAv1LRxKMk1kvdGTc8aS3Np04aGtBeerrTNnevh4uffyX4l64X/+TPXo+gVuRO+8ynZj3f+XoTrpDjjaFm0CcqlycOQ5WCvaM+ejashW2CkBUVbwsG5NA1HaTIEh3JphlBPMpQ7Zi6pB4wEQ/nEzuUBYL0qj+xcmq7vuUpvjYdyMS6p6+8dgyilJBMLVy18fhA+3zkGcZfZNhouzVUQj1pak9P1a+HyhsmZtxoWLmk4vymK8o8OQZSO+Ty3balMuWrFd74Kn3cOQZSO+d3AB5RLk2q04GuH2xVyiSnBAFzMJjauWunsYDV/GMyHB0NfSK719Q5Crrudp0y4tMP5ZyXv8bNYzaTc7HVui5VMuOobHEp5lUWptMtswxIhuNZZRRBx3QyZM+kz1+mD1XD2LgG9Sz2a0nY11/iIuBalIEvmra7iv4puOh9L9z2W3LuVNh0x3M8xvSc9OnR9KACQKysl6Asej4UrexGg3ZUA5MoG1+Z0DbrhIC6z1dRqp1YHDOLWiMtsMaDbM+jFVWc4+6K4zDQIZV6b6cNDuVzmNWfuPuq2QBBzuNwm4uI7+oFci9RWK3i2BMTlftaKPeUE4oKdNfjzdgZcqucIH4yux20M87nPyb4RBPEf1wdwnvr/+eHcXnis+KThMk0Nch6jNU0bwFzmZRPNexmAXC4T8ktF8IYQhx55RAXxMh8s+q4aFNcGNBS6qsBbk8BcoVAoFAqFQqFQKBQKhUKh0L3rrwADAIO/0wltxCn+AAAAAElFTkSuQmCC",active:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA11JREFUeNrsnIGN6jAMhttMkBE6Ahs8NqAjMMKNcEyAmOD0NqATwE0AG3AbwAZ56Sl60kmUOI39Jz35lyokoLE/10mdNm3TqFQqlUqlUv06tc65d//58Nu5bdvrkmE8y8p/rP1mw1cYLvdTN79tFxi8bfB9SrJcE0ZPfrMLCF4XfKVKhuuFwXvoHtV23eBjqvi5CAZthQG0ke7roFwEg5cKg3hy+bogg+jCGbyWAL45Pr0jgzimf1fJieTOGEQeLt/IB9HgRwVBJPsK5wp1FkVd4SykaFuMyze0rzkbiZm1L8qVUDbYSrPw9sw3BJf5P4lu23GeuSPs81YgESlTtl1g+HlxoAQX4ajdCmRitk+SXObJd4fIPh1yOuht9aPNyN8OhKZwXGEMqeYEQzihkKZwcC6K48Ag3rnApbjMxPdDZD8buhmiK8ey7G9Ck1guQgbsK+jKtxq4zIvfjpF9e0BvXkd+P85oE8c1pjVhIF4JZuGKYH9dA9dkJvoidTxij8xMkczCh/fxnNqoBJfJTP2NYBA3Al0Zz0W8CmIFujKlpusXwSUNkzlu2Vq4TGT8+L75HWnjj0BXjrV5fnaxIWFcZOUyhP/EClSJk0uszU8GGzguYqnRMdrrEKUVJ5chpP4VXOpQSpvstTWcXIZo88g1fjCMh0dGWyxc1CDGxiDOM3Sf6UuKcFxLHKeQXIY4fnz5jyvH+JF55K/BFxZxcZkEm7G6imOqtMn0YY4QXMucRSC5ODMxdyDumXzgzsSobyZh/JCeAopO9SS5TKLNoWAmDo2cBkgmElN/1o2ecIXaFujKLFwmMfXHciBWYsw5m8X2+ZJ8jCKXy8ywKXGjpy+Yhdlcc4L4ydmlictEBkAQWbko4NWvSijNxQHuEtbH4BwX4jIz7VGWbmyJ/+FcJpKrAxMX+ahVvWYQyWUy7MUypHv1UGL4rasoC1m4JC4Y5K6j7gpk4mwuyYG47Ip+INdcY/U/WwLiQhy1Mk85gbiQRw37vB0PF+k5QpNrLNyn2DH6v+O8j5LJdUAfuQtDFp6aykTh4i4Nch6j5Ssb+EueOySIwWA972UAckkNyCldeylvPrFTr02QNFr2XTVArhbRFZoSb03Cc6lUKpVKpVKpVCqVSqVSqVS/Xf8EGACrDRwFDCXJ4wAAAABJRU5ErkJggg=="}},slider:{color:"deepskyblue",direction:"horizontal"}}],envelope:[{name:"attack",slider:{description:"adjust time to attack.",color:"#20dab8",direction:"vertical"}},{name:"decay",slider:{description:"Adjust time taken to decay to sustain level.",color:"#20dab8",direction:"vertical"}},{name:"sustain",slider:{description:"adjust sustain level.",color:"#20dab8",direction:"vertical"}},{name:"release",slider:{description:"adjust time for sound to dissipate after releasing a key.",color:"#20dab8",direction:"vertical"}}],expression:{pitch:{name:"pitch",slider:{description:"adjust pitch",color:"linear-gradient(black, deepskyblue, black)",direction:"vertical"}},modulation:{name:"modulation",slider:{description:"adjust modulation amount",color:"linear-gradient(black, deepskyblue, black)",direction:"vertical"}}},keyboard:{blackKeys:[1,3,6,8,10,13,15,18,20,22]},palette:o.default,leds:[{color:o.default.red,octave:2},{color:o.default.yellow,octave:1},{color:o.default.lime,octave:0},{color:o.default.yellow,octave:-1},{color:o.default.red,octave:-2}]}}},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Sequencer=t.Synthesizer=void 0;var a=n(114),o=i(a),s=n(113),r=i(s);t.Synthesizer=o.default,t.Sequencer=r.default},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(56),o=i(a),s=n(12),r=i(s),c=n(24),l=i(c),u=n(6),d="nullwerk",f=f||window.localStorage,v=(n(11),{currentPresetName:"default",currentPreset:null,presets:null}),h=function(){function e(t){var n=t.defaults;if((0,r.default)(this,e),!f)return console.warn(u.errorMessages.localStorageNotSupported);var i=Boolean(f.getItem(d));if(!i){var a=(0,o.default)((0,u.merge)(n,v));f.setItem(d,a)}this.data=JSON.parse(f.getItem(d)),i||(this.data.currentPreset=this.data.presets.default),this._saveAndUpdateStore()}return(0,l.default)(e,[{key:"savePreset",value:function(e,t){this.data.presets[e]=t,this._saveAndUpdateStore()}},{key:"changePreset",value:function(e){return this.data.presets[e]?(this.data.currentPreset=this.data.presets[e],this.data.currentPresetName=e,void this._saveAndUpdateStore()):console.error(e+" not a preset!")}},{key:"_saveAndUpdateStore",value:function(){f.setItem(d,(0,o.default)(this.data));var e=JSON.parse(f.getItem(d));this.data=e}},{key:"currentPreset",get:function(){return this.data.currentPreset}},{key:"config",get:function(){return this.data}},{key:"allPresets",get:function(){return this.data.presets}}]),e}();t.default=h},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(58),o=i(a),s=n(12),r=i(s),c=n(24),l=i(c),u=n(54),d=i(u),f=261.626,v=function(){function e(t){var n=this,i=t.config;(0,r.default)(this,e),this.onMIDIStateChange=function(e){e.target.state;console.log("MIDI state changed to "+state+"!")},this.onMIDIMessage=function(e){var t=e.data,i=(t[0]>>4,15&t[0],240&t[0]),a=t[1],o=t[2];switch(i){case 144:n.noteOn(a,o);break;case 128:n.noteOff()}},this.onMIDIConnect=function(e){for(var t=e.inputs.values(),i=t.next();i&&!i.done;i=t.next())i.value.onmidimessage=n.onMIDIMessage,i.value.onmidistatechange=n.onMIDIStateChange},this.onMIDIFail=function(e){console.log("Midi Fail! Error Name:  "+e.name),console.log(e)},this.fromMIDI=function(e){var t=Math.pow(2,(e-69)/12)*f;return t},this.settings=i,this.context=new(window.AudioContext||window.webkitAudioContext),this.oscillators=null,this.MIDIAccess=d.default.init(),this.MIDIAccess&&this.MIDIAccess.then(this.onMIDIConnect,this.onMIDIFail),this.masterGain=this.context.createGain(),this.masterGain.connect(this.context.destination),this.recording=[],this.recordEnabled=!1}return(0,l.default)(e,[{key:"recordEventTime",value:function(){this.recording.push({time:this.context.currentTime})}},{key:"export",value:function(){return this.settings}},{key:"noteOn",value:function(e,t){var n=this.fromMIDI(e);this.playNote(null,n)}},{key:"noteOff",value:function(){this.muteNote()}},{key:"toggleOscillatorVolume",value:function(e){var t=this.settings.oscillators[e];t.active?(t.savedValue=t.value,t.value=0):t.value=t.savedValue,t.active=!t.active}},{key:"toggleMasterVolume",value:function(){var e=this.settings.masterVolume,t=this.settings.active;t?(e.savedValue=e.value,e.value=0):e.value=e.savedValue,this.settings.active=!this.settings.active}},{key:"playNote",value:function(e,t){var n=this,i=t?t:this._indexToFrequency(e);this.oscillators&&this.oscillators.forEach(function(e){e.gain.gain.linearRampToValueAtTime(0,n.context.currentTime),e.osc.stop(n.context.currentTime+.01)}),this.oscillators=this._createNote(i)}},{key:"envelopeValueToDuration",value:function(e,t){var n={attack:function(e){return 3*e},decay:function(e){return 6*e},release:function(e){return 6*e}};return n[e](t)}},{key:"muteNote",value:function(){var e=this.envelopeValueToDuration("release",this.settings.envelope.release.value);this.context.currentTime+e;this.oscillators.forEach(function(e){})}},{key:"_createNote",value:function(e){var t=this.masterGain,n=this.context,i=this.settings.oscillators,a=this.settings.envelope,s=this;return(0,o.default)(i).map(function(e){return i[e]}).map(function(i,o){var r={osc:null,gain:null};r.osc=n.createOscillator(),r.osc.type=i.name,r.osc.frequency.value=e,r.osc.frequency.originalFrequency=e,r.gain=n.createGain(),r.gain.gain.value=0;var c=n.currentTime+s.envelopeValueToDuration("attack",a.attack.value),l=c+s.envelopeValueToDuration("decay",a.decay.value),u=a.sustain.value*i.value;return r.gain.gain.linearRampToValueAtTime(i.value,c),r.gain.gain.linearRampToValueAtTime(u,l),r.osc.connect(r.gain),r.gain.connect(t),r.osc.start(),r})}},{key:"_indexToFrequency",value:function(e){var t=f*Math.pow(2,this.octave);return t*Math.pow(Math.pow(2,1/12),e)}},{key:"sineValue",get:function(){return this.settings.oscillators.sine.value},set:function(e){this.settings.oscillators.sine.value=e}},{key:"squareValue",get:function(){return this.settings.oscillators.square.value},set:function(e){this.settings.oscillators.square.value=e}},{key:"sawtoothValue",get:function(){return this.settings.oscillators.sawtooth.value},set:function(e){this.settings.oscillators.square.value=e}},{key:"triangleValue",get:function(){return this.settings.oscillators.triangle.value},set:function(e){this.settings.oscillators.triangle.value=e}},{key:"attackValue",get:function(){return this.settings.envelope.attack.value},set:function(e){this.settings.envelope.attack.value=e}},{key:"decayValue",get:function(){return this.settings.envelope.decay.value},set:function(e){this.settings.envelope.decay.value=e}},{key:"sustainValue",get:function(){return this.settings.envelope.sustain.value},set:function(e){this.settings.envelope.sustain.value=e}},{key:"releaseValue",get:function(){return this.settings.envelope.release.value},set:function(e){this.settings.envelope.release.value=e}},{key:"octave",get:function(){return this.settings.octave},set:function(e){Math.abs(e)>2||(this.settings.octave=e)}},{key:"active",get:function(){return this.settings.active},set:function(e){e?(this.settings.masterVolume.savedValue=this.settings.masterVolume.value,this.settings.masterVolume.value=0):this.settings.masterVolume.value=this.settings.masterVolume.savedValue,this.settings.active=!this.settings.active}}]),e}();t.default=v},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(12),o=i(a),s=function e(){(0,o.default)(this,e)};t.default=s},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={init:function(){return"function"!=typeof navigator.requestMIDIAccess?(console.log("Sorry, your browser doesn't seem to support the Web Midi Api :[ "),null):navigator.requestMIDIAccess({sysex:!1})}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},,,,,,function(e,t,n){var i,a;n(98),i=n(38);var o=n(124);a=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(a=i=i.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(95),i=n(39);var o=n(121);a=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(a=i=i.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(99),i=n(41);var o=n(125);a=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(a=i=i.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(92),i=n(42);var o=n(118);a=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(a=i=i.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(90),i=n(43);var o=n(116);a=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(a=i=i.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,a._scopeId="data-v-04816b85",e.exports=i},function(e,t,n){var i,a;n(93),i=n(44);var o=n(119);a=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(a=i=i.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(97),i=n(45);var o=n(123);a=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(a=i=i.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(96),i=n(46);var o=n(122);a=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(a=i=i.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(89),i=n(47);var o=n(115);a=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(a=i=i.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t,n){var i,a;n(94),i=n(48);var o=n(120);a=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(a=i=i.default),"function"==typeof a&&(a=a.options),a.render=o.render,a.staticRenderFns=o.staticRenderFns,e.exports=i},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"sequencer"},[n("div",{staticClass:"sequencer-controls"}),e._v(" "),n("div",{staticClass:"sequencer-buttons"},e._l(e.steps,function(t){return n("LED",{attrs:{diameter:"15%",color:e.preset.color}})}))])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"led-container-inner"},[n("div",{staticClass:"led",class:{active:e.isActive},style:{background:e.color,width:e.diameter}})])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"key",class:e.classData,style:e.styleData,on:{touchstart:function(t){t.preventDefault(),e.startNote(e.index)},touchend:function(t){t.preventDefault(),e.stopNote(e.index)},mousedown:function(t){t.preventDefault(),e.startNote(e.index)},mouseup:function(t){t.preventDefault(),e.stopNote(e.index)}}})},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"knob-container",style:{width:e.diameter}},[n("div",{staticClass:"knob",style:e.styleData,attrs:{draggable:"true"},on:{click:e.toggleActive}})])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",{
staticClass:"preset-name"},[e._v("\n        preset:  "),n("span",[e._v(e._s(e.presetData.currentPresetName))])]),e._v(" "),n("i",{staticClass:"save-icon fa fa-save",on:{click:e.updatePreset}}),e._v(" "),n("select",{directives:[{name:"show",rawName:"v-show",value:"select"===e.state,expression:"state === 'select'"},{name:"model",rawName:"v-model",value:e.selected,expression:"selected"}],on:{change:[function(t){var n=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.selected=t.target.multiple?n:n[0]},e.changePreset]}},[e._l(e.presetData.presets,function(t,i){return n("option",{domProps:{value:i}},[e._v("\n            "+e._s(i)+"\n        ")])}),e._v(" "),n("option",{attrs:{value:"new"}},[e._v("Save New Preset")])],2),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:"new"===e.state,expression:"state === 'new'"}],staticClass:"input-container"},[n("input",{directives:[{name:"model",rawName:"v-model:value",value:e.inputValue,expression:"inputValue",arg:"value"}],domProps:{value:e.inputValue},on:{input:function(t){t.target.composing||(e.inputValue=t.target.value)}}}),e._v(" "),n("i",{staticClass:"close-input fa fa-close",on:{click:e.cancelSave}}),e._v(" "),n("i",{staticClass:"close-input fa fa-check",on:{click:e.newPreset}})])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"synth-container"},[n("div",{staticClass:"module master-pitch-container"},[n("div",{staticClass:"LED-container",attrs:{title:"octave meter"}},e._l(e.ui.leds,function(t){return n("LED",{attrs:{diameter:"15%",color:t.color,currentOctave:e.localStorage.config.currentPreset.octave,octave:t.octave}})})),e._v(" "),n("div",{staticClass:"octave-buttons-container",attrs:{title:"octave"}},[n("btn",{staticClass:"octave-button-up",attrs:{title:"octave +1"},on:{press:function(t){e.adjustOctave(1)}}},[n("i",{staticClass:"fa fa-caret-up",style:{color:e.palette.white},attrs:{slot:"label"},slot:"label"})]),e._v(" "),n("btn",{staticClass:"octave-button-down",attrs:{title:"octave -1"},on:{press:function(t){e.adjustOctave(-1)}}},[n("i",{staticClass:"fa fa-caret-down",style:{color:e.palette.white},attrs:{slot:"label"},slot:"label"})])],1)]),e._v(" "),n("div",{staticClass:"module master-volume-container",attrs:{title:"Master Volume. Swipe up to increase. Swipe down to decrease. Tap to mute."}},[n("div",{staticClass:"volume-container"},[n("LED",{attrs:{color:"red"}}),e._v(" "),n("LED",{attrs:{color:"red"}}),e._v(" "),n("LED",{attrs:{color:"red"}}),e._v(" "),n("LED",{attrs:{color:"red"}}),e._v(" "),n("LED",{attrs:{color:"red"}})],1),e._v(" "),n("knob",{attrs:{color:"black",diameter:"50%"},on:{toggle:e.toggleMasterVol}})],1),e._v(" "),n("div",{staticClass:"module waveforms-and-options-container"},[n("div",{staticClass:"waveforms-container"},e._l(e.ui.waveforms,function(t){return n("knob",{attrs:{active:e.localStorage.config.currentPreset.oscillators[t.name].active,"bg-image-active":t.knob.img.active,"bg-image-inactive":t.knob.img.inactive,waveform:t.name,color:t.knob.color,title:"toggle "+t.name+" level on / off.",diameter:"25%"},on:{toggle:e.toggleOscillatorVol}})})),e._v(" "),n("div",{staticClass:"waveform-level-container"},e._l(e.ui.waveforms,function(t){return n("slider",{attrs:{"control-source":e.soundEngine.settings.oscillators[t.name],direction:t.slider.direction,name:t.name,content:t.name,title:"adjust "+t.name+"wave volume.",color:t.slider.color},on:{slide:e.adjustOscillatorVolume}})}))]),e._v(" "),n("div",{staticClass:"module envelope-container"},e._l(e.ui.envelope,function(t){return n("div",{staticClass:"envelope-slider-container"},[n("h1",{staticClass:"envelope-slider-label",attrs:{title:t.name}},[e._v(e._s(e._f("abbreviate")(t.name)))]),e._v(" "),n("slider",{attrs:{"control-source":e.soundEngine.settings.envelope[t.name],direction:t.slider.direction,opacity:.7,name:t.name,content:t.name,color:t.slider.color,title:t.slider.description},on:{slide:e.setEnvelopeValue}})],1)})),e._v(" "),n("div",{staticClass:"module wheels-container"},[n("div",{staticClass:"expression-wheel-container"},[n("slider",{attrs:{sticky:!0,"control-source":e.soundEngine.settings.expression.modulation,direction:e.ui.expression.modulation.slider.direction,opacity:1,name:e.ui.expression.modulation.name,content:e.ui.expression.modulation.name,color:e.ui.expression.modulation.slider.color,title:e.ui.expression.modulation.name},on:{slide:e.adjustOscillatorPitch,slideend:e.adjustOscillatorPitch}})],1),e._v(" "),n("div",{staticClass:"modulation-wheel-container"},[n("slider",{attrs:{sticky:!0,"control-source":e.soundEngine.settings.expression.modulation,direction:e.ui.expression.modulation.slider.direction,opacity:1,name:e.ui.expression.modulation.name,content:e.ui.expression.modulation.name,color:e.ui.expression.modulation.slider.color,title:e.ui.expression.modulation.name}})],1)]),e._v(" "),n("div",{staticClass:"module selector-container"},[n("preset-manager",{attrs:{"preset-data":e.localStorage.config},on:{NEW_PRESET:e.newPreset,CHANGE_PRESET:e.changePreset,UPDATE_PRESET:e.updatePreset}})],1),e._v(" "),n("div",{staticClass:"module keyboard-container"},[n("div",{staticClass:"keyboard"},e._l(25,function(t){return n("key",{attrs:{index:t-1,blackKeys:e.ui.keyboard.blackKeys},on:{noteon:e.noteOn,noteoff:e.noteOff}})}))])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"button",style:e.buttonStyle,on:{click:e.press}},[e._t("label")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;e._self._c||t;return e._m(0)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wheel-container"},[n("div",{staticClass:"wheel"}),e._v(" "),n("div",{staticClass:"handle"}),e._v(" "),n("div",{staticClass:"wheel"})])}]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-touch",{directives:[{name:"show",rawName:"v-show",value:e.controlSource.active,expression:"controlSource.active"}],staticClass:"slider-bar",style:e.barStyle,attrs:{"pan-options":{direction:e.direction,threshold:0}},on:{pan:e.moveSlider,panend:e.moveSliderEnd}})},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"synth-workstation"},[n("synthesizer")],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"keyboard"},e._l(25,function(t){return n("key",{attrs:{index:t-1,blackKeys:e.blackKeys}})}))},staticRenderFns:[]}}]);
//# sourceMappingURL=app.f0fad447ec31df1a92c0.js.map