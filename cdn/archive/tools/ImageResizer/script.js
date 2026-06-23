        const uploadBtn = document.getElementById('uploadBtn');
        const fileInput = document.getElementById('fileInput');
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const widthRange = document.getElementById('widthRange');
        const heightRange = document.getElementById('heightRange');
        const widthValue = document.getElementById('widthValue');
        const heightValue = document.getElementById('heightValue');
        const invertCheck = document.getElementById('invertCheck');
        const downloadBtn = document.getElementById('downloadBtn');
        let img = new Image();

        uploadBtn.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function(event) {
                img = new Image();
                img.onload = function() {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    updateCanvas();
                }
                img.src = event.target.result;
            }
            reader.readAsDataURL(file);
        });

        widthRange.addEventListener('input', updateCanvas);
        heightRange.addEventListener('input', updateCanvas);
        invertCheck.addEventListener('change', updateCanvas);

        function updateCanvas() {
            widthValue.textContent = widthRange.value;
            heightValue.textContent = heightRange.value;

            const width = widthRange.value;
            const height = heightRange.value;
            
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            if (invertCheck.checked) {
                ctx.globalCompositeOperation = 'difference';
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, width, height);
                ctx.globalCompositeOperation = 'source-over';
            }
        }

        downloadBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = 'modified-image.png';
            link.href = canvas.toDataURL();
            link.click();
        });
   
