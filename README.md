# FrameParticle.js
 ストラクチャーの枠のようなパーティクルを生成することができるクラスを追加します。  
 ![パーティクル](https://i.imgur.com/qFfWQiF.png, "パーティクル")  

## 導入方法  
  1. Releasesからzipファイルをダウンロードし解凍してください  
  2. 解凍されたフォルダから`FrameParticleRP/particles`の中身をご自身のリソースパックの`particlesフォルダ`にコピーしてください  
  3. 解凍されたフォルダから`FrameParticleBP/scripts/FrameParticle.js`をご自身のビヘイビアーパックのスクリプトフォルダにコピーしてください  
  4. ご自身のビヘイビアーパックの`manifest.json`の`entry`で指定したファイルに`FrameParticle.js`をインポートしてください  

## 例  
```
import { FrameParticle } from "./FrameParticle.js";

world.events.itemUse.subscribe(event => {
  let entity = event.source;
  //アイテムを使用したとき、その座標に1×1のパーティクルを生成する
  new FrameParticle(entity.dimension, entity.location, entity.location).show();
});
```

## 使い方
指定したディメンションと二つの座標をから枠パーティクルを生成する  

## Properties
### dimension  
```read-only dimension: Dimension;```  
このパーティクルのディメンションを返す  
Type: Dimension  

### location1  
```location1: Location;```  
このパーティクルの一つ目の座標を返す  
Type: Location  

### location2  
```location2: Location;```  
このパーティクルの二つ目の座標を返す  
Type: Location  

## Methods
### コンストラクタ  
```new FrameParticle(dimension: Dimension, location1: Location, location2: Location)```  
新しくFrameParticleオブジェクトを作る  
Returns FrameParticle  

### show
```show(): FrameParticle```  
このパーティクルを表示する  
Returns FrameParticle  

### delete
```delete(): void```  
このパーティクルを削除する  

## 特徴  
このパーティクルは指定された範囲の大きさによってパーティクルのサイズを変更させているため、範囲の大きさによって必要なパーティクル数が変わりません。  

## 使用例  
- world editの範囲指定表示  
- 1m以上のブロックやブロックエンティティの設置範囲表示  
など  

## 既知の不具合 
範囲が大きいいとき、一辺の中心が視界外にありかつ数メートル離れている場合、その辺が点滅する。(点滅対策をしたため、点滅によって範囲が見えにくくなるということは防げているかと思います。)   

## 連絡先  
 [twitter](https://twitter.com/momonstera)