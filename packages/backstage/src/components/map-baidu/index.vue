<template>
  <baidu-map
      :class="{'editDisbleMap': !isEdit}"
      :center="center"
      :zoom="zoom"
      @ready="handler"
      @click="getClickInfo"
      :enableMapClick='false'
      class="mapBox"
      :scroll-wheel-zoom='true'>
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"/>
      <bm-map-type  :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
                    anchor="BMAP_ANCHOR_TOP_LEFT"/>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"/>
    </baidu-map>
</template>
<script lang="ts">
import {
  Vue, Component, Prop,
} from 'vue-property-decorator'

interface SecRingObj {
  lng: string
  lat: string
}

interface SecRingArr {
  forEach: any,
  [index: number]: SecRingObj
}

@Component({
  name: 'mapBaidu',
})
export default class mapBaidu extends Vue {
  @Prop(Boolean) isEdit!:boolean

  @Prop(Array) secRingArr!:SecRingArr

  public index:number = 0 // 区域块的个数，目前是确定一个

  public BMap:any

  public map:any

  public polygon:any = [] // 区域块的信息

  public center:any = { lng: 114.050, lat: 22.550 } // 深圳的地址

  public zoom:number = 15

  // ready申请的函数
  private handler({ BMap, map }: any) {
    this.BMap = BMap
    this.map = map
    this.init()
  }

  // 初始化函数
  private init() {
    const point = new this.BMap.Point(this.center.lng, this.center.lat)
    this.map.centerAndZoom(point, this.zoom)
    this.oneDymamicArea()
    // 绑定右键事件
    this.map.addEventListener('rightclick', (e: { point: any }) => {
      this.map.clearOverlays()
      this.index = 0
      const obj = {
        lat: 0,
        lng: 0,
        index: 0,
        map: null,
      }
      obj.lat = e.point.lat
      obj.lng = e.point.lng
      obj.index = this.index
      obj.map = this.map
      this.initDymamicArea(obj)
    })
  }

  private oneDymamicArea() {
    // 默认有传值的状态，需要进行中心点
    this.center = { lng: 0, lat: 0 }
    this.secRingArr.forEach((item: { lng: number, lat: number }) => {
      this.center.lng += item.lng
      this.center.lat += item.lat
    })
    const Alng = (this.center.lng / (this.secRingArr as []).length)
    const Alat = (this.center.lat / (this.secRingArr as []).length)
    this.center.lng = Alng
    this.center.lat = Alat
    const point = new this.BMap.Point(this.center.lng, this.center.lat)
    this.map.centerAndZoom(point, this.zoom)
    this.polygon = []
    this.polygon[0] = new this.BMap.Polygon(
      this.secRingArr,
      {
        strokeColor: '#548dff',
        fillColor: '#ffa1a1',
        strokeWeight: 3,
        strokeOpacity: 0,
        fillOpacity: 0,
      },
    )
    this.polygon[0].enableEditing()
    this.map.addOverlay(this.polygon[0])
  }

  private initDymamicArea(
    obj: { lat: number, lng: number, index: number, map: any, },
  ) {
    let { lat } = obj
    let { lng } = obj
    lat = Number(lat.toFixed(3))
    lng = Number(lng.toFixed(3))
    const x1 = Number((lat + 0.005).toFixed(3))
    const x2 = Number((lat - 0.005).toFixed(3))
    const y1 = Number((lng + 0.005).toFixed(3))
    const y2 = Number((lng - 0.005).toFixed(3))
    const secRing = []
    secRing.push(new this.BMap.Point(y1, x1))
    secRing.push(new this.BMap.Point(y1, x2))
    secRing.push(new this.BMap.Point(y2, x2))
    secRing.push(new this.BMap.Point(y2, x1))
    this.polygon = []
    this.polygon[obj.index] = new this.BMap.Polygon(
      secRing,
      {
        strokeColor: '#548dff',
        fillColor: '#ffa1a1',
        strokeWeight: 3,
        strokeOpacity: 0,
        fillOpacity: 0,
      },
    )
    this.polygon[obj.index].enableEditing()
    obj.map.addOverlay(this.polygon[obj.index])
  }

  // 地图进行点击
  getClickInfo(e: any) {
    this.getPath()
    console.log(`${e}正常单击可以进行路径的选择`)
  }

  // 获取得到对应的坐标的位置
  public getPath() {
    const res = this.polygon[0] && this.polygon[0].getPath()
    return res
  }
}
</script>
<style lang="scss">
.mapBox {
  width: 700px;
  height:500px;
  float: left;
  margin: 20px;
  border: 1px solid #aaa;
  overflow:hidden;
}
.anchorBL {
  display: none;
}
.editDisbleMap {
  .BMap_vectex {
    // 这个进行控制是否可以进行编辑的功能
    display: none !important;
  }
}
</style>
