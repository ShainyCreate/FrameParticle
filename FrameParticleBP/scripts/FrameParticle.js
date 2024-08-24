/*LICENSE : https://github.com/moonstera/FrameParticle/blob/main/LICENSE*/
import {
  system,
  Dimension,
  MolangVariableMap
} from "@minecraft/server";

export class FrameParticle {
  static #_particle_id = 0;
  static _frame_particles = new Map();

  constructor(dim, loc1, loc2){
    //型チェック
    if(!(dim instanceof Dimension)){
      console.error("The specified object is of invalid type. The correct type is \"Dimension\".");
    }
    if (loc1.x == null || loc1.y == null || loc1.z == null) {
      console.error("The specified object is of invalid type. The correct type is \"Vector3\".");
    }
    if (loc2.x == null || loc2.y == null || loc2.z == null) {
      console.error("The specified object is of invalid type. The correct type is \"Vector3\".");
    }
    
    this._dim = dim;
    this._loc1 = { x: Math.floor(loc1.x), y: Math.floor(loc1.y), z: Math.floor(loc1.z) };
    this._loc2 = { x: Math.floor(loc2.x), y: Math.floor(loc2.y), z: Math.floor(loc2.z) };
    this._moving = 0;  //0: false, 1~: true  //座標が変更されたときの残像を軽減するため
    this._id = FrameParticle.#_particle_id++;
  }

  show(){
    FrameParticle._frame_particles.set(this._id, this);
    return this;
  }

  get dimension(){
    return this._dim;
  }

  get location1(){
    return this._loc1;
  }

  get location2(){
    return this._loc2;
  }

  set location1(loc){
    if (loc.x != null || loc.y != null || loc.z != null) {
      let new_loc = { x: Math.floor(loc.x), y: Math.floor(loc.y), z: Math.floor(loc.z) };
      if (this._loc1.x != new_loc.x || this._loc1.y != new_loc.y || this._loc1.z != new_loc.z) {
        this._loc1 = new_loc;
        this._moving = 1;
      }
    } else {
      console.error("The specified object is of invalid type. The correct type is \"Vector3\".");
    }
  }

  set location2(loc){
    if (loc.x != null || loc.y != null || loc.z != null) {
      let new_loc = { x: Math.floor(loc.x), y: Math.floor(loc.y), z: Math.floor(loc.z) };
      if (this._loc2.x != new_loc.x || this._loc2.y != new_loc.y || this._loc2.z != new_loc.z) {
        this._loc2 = new_loc;
        this._moving = 1;
      }
    } else {
      console.error("The specified object is of invalid type. The correct type is \"Vector3\".");
    }
  }

  delete(){
    return FrameParticle._frame_particles.delete(this._id);
  }

}

system.runInterval(() => {
  FrameParticle._frame_particles.forEach((particle, id) => {
    let x = particle.location1.x < particle.location2.x ? particle.location1.x : particle.location2.x;
    let y = particle.location1.y < particle.location2.y ? particle.location1.y : particle.location2.y;
    let z = particle.location1.z < particle.location2.z ? particle.location1.z : particle.location2.z;

    let size_x = Math.abs(particle.location1.x - particle.location2.x)+1;
    let size_y = Math.abs(particle.location1.y - particle.location2.y)+1;
    let size_z = Math.abs(particle.location1.z - particle.location2.z)+1;

    let molang = new MolangVariableMap();
    molang.setVector3("variable.id", { x: id, y: particle._moving, z: 0 });
    molang.setVector3("variable.size", { x: size_x, y: size_y, z: size_z });
    particle.dimension.spawnParticle("frame_particle:creater", { x, y, z }, molang);
    if(particle._moving > 0){
      particle._moving = 0;
    }
  });
});
