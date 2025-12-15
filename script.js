let shapes = [];
    let points = [];
    let balls = [];

    function setup() {
      let canvas = createCanvas(windowWidth, 600, WEBGL);
      canvas.parent('header-canvas'); // خیلی مهم: canvas رو به div وصل کن

      // مکعب - منهتن
      shapes.push({ type: 'box', pos: createVector(200, 0, 0), size: 180, color: [255, 80, 180] });
      // هشت‌وجهی - چبیشف
      shapes.push({ type: 'octahedron', pos: createVector(-200, 0, 0), size: 180, color: [80, 255, 180] });

      // نقاط
      for (let i = 0; i < 25; i++) {
        points.push(p5.Vector.random3D().mult(random(500, 900)));
      }
      // توپ‌ها
      for (let i = 0; i < 6; i++) {
        let pos = p5.Vector.random3D().mult(random(400, 700));
        balls.push({ pos: pos, radius: random(100, 180) });
      }
    }

    function draw() {
      background(5, 8, 20);
      ambientLight(60);
      pointLight(150, 200, 255, 0, 0, 200);

      rotateY(frameCount * 0.004);
      rotateX(frameCount * 0.002);

      // رسم اشکال wireframe نئونی
      for (let s of shapes) {
        push();
        let offset = createVector(sin(frameCount * 0.012) * 60, cos(frameCount * 0.012) * 60, sin(frameCount * 0.012) * 40);
        translate(s.pos.x + offset.x, s.pos.y + offset.y, s.pos.z + offset.z);
        rotateY(frameCount * 0.008);
        rotateX(frameCount * 0.006);

        noFill();
        stroke(s.color);
        strokeWeight(6);

        if (s.type === 'box') box(s.size);
        else if (s.type === 'octahedron') {
          rotateX(PI/4);
          cone(s.size / sqrt(2), s.size * 1.5, 4, 1);
          rotateX(PI);
          cone(s.size / sqrt(2), s.size * 1.5, 4, 1);
        }
        pop();
      }

      // توپ‌های شفاف
      noFill();
      stroke(100, 200, 255, 70);
      strokeWeight(2);
      for (let b of balls) {
        push();
        translate(b.pos.x, b.pos.y, b.pos.z);
        sphere(b.radius);
        pop();
      }

      // نقاط
      noStroke();
      fill(150, 220, 255);
      for (let p of points) {
        push();
        translate(p.x, p.y, p.z);
        sphere(5);
        pop();
      }
    }

    function windowResized() {
      resizeCanvas(windowWidth, 600);
    }