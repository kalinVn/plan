class Vector2D {

	constructor(x, y){
		this.x = x;
		this.y = y;
	}
	
	substract(vector){
		return  new Vector2D(this.x - vector.x,  this.y - vector.y);
    }
    
    dot(vector){
        return  (this.x) * (vector.x) +  (this.y )* (vector.y)
    }
	
	length(){
        return  Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
	
    distFrom(vector){
        return  this.substract(vector).length();
    }
	
	add(vector){
        return new Vector2D(this.x + vector.x, this.y + vector.y);
    }
	
	mult(scalar){
        return  new Vector2D(this.x * scalar,  this.y * scalar);
    }
	cross(vector){
        return  (this.x) * (vector.y) -  (this.y )* (vector.x)
    }
	addTo(vector){
        this.x += vector.x;
        this.y += vector.y;
    }


}
export default  Vector2D;
