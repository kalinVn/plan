import Loader from "../lib/Loader.js";
import Vector2D from "../lib/Vector2D.js";
import Rocket from "../units/Rocket.js";

class Tank  {
	constructor(url, game, plan) {
        this.url = url;
        this.game = game;
        this.app = game.app;
        this.sprite;
        this.plan  = plan;
        this.angle = 1;
        this.tankRockets = [];
        this.loader = new Loader();
	}
	
	async init() {
        this.sprite = await this.loader.loadSprite(this.url);
        this.sprite.x = 1300;
        this.sprite.y = 505;
        this.sprite.anchor.set(0.2, 0.5);
        this.app.stage.addChild(this.sprite);
        this._stepDistPerShoot = 1
        this._distPerShoot = 120;
	}

    update(){
        this.sprite.x -= 0.5;
    }

	async shoot(){
        this.sprite.x -= 0.5;
        let planPos = new Vector2D(this.plan.sprite.x, this.plan.sprite.y);
        let tankPos = new Vector2D(this.sprite.x , this.sprite.y) ;
        let frontVector = planPos.substract(tankPos);
        this.unitVector = frontVector.mult(1 / frontVector.length());
        frontVector = new Vector2D(tankPos.x +  this.unitVector.x * 70,tankPos.y + this.unitVector.y * 70);
        
        //if(this.sprite.x < 1200 - this._stepDistPerShoot * this._distPerShoot
        //    && this.sprite.x > 0 && !this.rocket){
                
        this._stepDistPerShoot++;
        let planSpriteVector = new Vector2D(this.sprite.x, this.sprite.y);
        let axis = new Vector2D(0, this.sprite.y); 
        let vector1 = planSpriteVector.substract(axis);
        let vector2 = planSpriteVector.substract(planPos);
        let crossPr = vector2.cross(vector1);
        let dotPr = vector2.dot(vector1);
        let angle = Math.atan2(crossPr, dotPr) * 180/Math.PI;
        let url = "/src/assets/spritesheet/rocket.json";
        let id = "rocket";
        let rocket = new Rocket(url, id, this.game, this);
        //this.tankRockets.push(rocket);
        this.game.rockets.push(rocket);
        await this.game.clearCache()
        await rocket.init(this.app, this.game, tankPos.x, tankPos.y, 270 - angle, -30, -50);
        //}
    }
    clear(game){
        this.tankRockets.forEach( (rocket) => {
            game.app.stage.removeChild(rocket.sprite);
        });
    }
    getStepDistPerShoot(){
        return  this._stepDistPerShoot;
    }

    getDistPerShoot(){
        return  this._distPerShoot;
    }

}
export default Tank;