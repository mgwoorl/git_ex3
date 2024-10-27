(function() {
    function puzzle() {
        let randomPlace = document.querySelector(".pices");
        let tableForPuzzle = document.querySelector(".table_for_puzzle");

        container.addEventListener('mousedown', e => {
            if (e.target.classList.contains("piece")) {
                let current = e.target;
                let x = e.x, y = e.y;

                let bx = current.offsetLeft;
                let by = current.offsetTop;

                current.style.pointerEvents = "none";

                let trackMove = e => {
                    e.preventDefault();

                    let cx = e.x, cy = e.y;

                    let dx = cx - x, dy = cy - y;

                    let nx = bx + dx, ny = by + dy;
                    
                    if (nx > document.body.offsetWidth - current.offsetWidth) {
                        nx = document.body.offsetWidth - current.offsetWidth;
                    }
                    
                    if (ny > document.body.offsetHeight - current.offsetHeight) {
                        ny = document.body.offsetHeight - current.offsetHeight;
                    }
                    
                    current.style.left = nx + "px";
                    current.style.top = ny + "px";
                }

                let release = e => {
                    let randomPlace = document.querySelector(".pices"); 
                    let tableForPuzzle = document.querySelector(".table_for_puzzle");

                    window.removeEventListener("mousemove", trackMove);
                    window.removeEventListener("mouseup", release); 

                    current.style.pointerEvents = "all"; 

                    if (e.target === randomPlace && current.parentElement != randomPlace) {
                        randomPlace.append(current);

                        current.style.left = "0px"; 
                        current.style.top = "0px";
                    }
                   
                    else if (e.target.classList.contains("cells")) {
                        if (e.target.querySelector(".piece")) {
                            let otherPiece = e.target.querySelector(".piece");

                            otherPiece.style.left = current.style.left;
                            otherPiece.style.top = current.style.top;

                            current.parentElement.append(otherPiece);

                            current.style.left = "0px";
                            current.style.top = "0px";

                            e.target.append(current);
                        }

                        else {
                            // Если на элементе, на который кликнули, нет других элементов
                            current.style.left = "0px";
                            current.style.top = "0px";

                            e.target.append(current);
                        } 
                    }
     
                    else if (e.target.classList.contains("piece")) {
                        if (e.target.parentElement.classList.contains("cells")) {
                            let otherPiece = e.target;
                            let buf = otherPiece.parentElement;

                            if (current.parentElement.classList.contains("cells")) {
                                otherPiece.style.left = "0px";
                                otherPiece.style.top = "0px";
                            }

                            else {
                                otherPiece.style.left = bx + "px";
                                otherPiece.style.top = by + "px";
                            }

                            current.parentElement.append(otherPiece);

                            current.style.left = "0px";
                            current.style.top = "0px";

                            buf.append(current);
                    }

                        else {
                            return;
                        }
                    }
                    else {
                        current.style.left = bx + "px";
                        current.style.top = by + "px";
                    }
                }
                window.addEventListener("mousemove", trackMove);
                window.addEventListener("mouseup", release);
            }
        });
    }

    function pieces() {
        let randomPlace = document.querySelector(".pices"); 
        let tableForPuzzle = document.querySelector(".table_for_puzzle");
        
        for (let i = 0; i < 9; i++) { 
            for (let j = 0; j < 6; j++) {
                const piece = document.createElement("div"); // Создаем элемент div для блока пазла
                piece.classList.add("piece"); // Добавляем класс "piece" к элементу
        
                const x = -50 * i; // Вычисляем координату по оси X для задания фона блока пазла
                const y = -50 * j; // Вычисляем координату по оси Y для задания фона блока пазла
        
                piece.style.backgroundPositionX = `${x}px`; // Задаем координату по оси X для фона блока пазла
                piece.style.backgroundPositionY = `${y}px`; // Задаем координату по оси Y для фона блока пазла
        
                randomPlace.append(piece); // Добавляем блок пазла в элемент с классом "pices"
        
                const maxX = 600; 
                const maxY = 700;
        
                piece.style.top = `${Math.random() * maxX}px`; // Задаем случайную позицию для блока пазла
                piece.style.left = `${Math.random() * maxY}px`; 
        
                piece.cordX = i; 
                piece.cordY = j;
        
                const cells = document.createElement("div"); 
                cells.classList.add("cells");
                tableForPuzzle.append(cells);
            }
        }
    }

    pieces();
    puzzle();
})(); 


