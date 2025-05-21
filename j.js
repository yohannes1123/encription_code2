  document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const cipherTypeSelect = document.getElementById('cipher-type');
            const cipherOptions = document.getElementById('cipher-options');
            const plaintext = document.getElementById('plaintext');
            const result = document.getElementById('result');
            const encryptBtn = document.getElementById('encrypt-btn');
            const decryptBtn = document.getElementById('decrypt-btn');
            const clearBtn = document.getElementById('clear-btn');
            const copyBtn = document.getElementById('copy-btn');
            const tabBtns = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');
            const mobileMenu = document.querySelector('.mobile-menu');
            const nav = document.querySelector('nav ul');

            // Mobile menu toggle
            mobileMenu.addEventListener('click', function() {
                nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            });

            // Tab functionality
            tabBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const tabId = this.getAttribute('data-tab');
                    
                    // Remove active class from all buttons and contents
                    tabBtns.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));
                    
                    // Add active class to clicked button and corresponding content
                    this.classList.add('active');
                    document.getElementById(tabId).classList.add('active');
                });
            });

            // Clear button functionality
            clearBtn.addEventListener('click', function() {
                plaintext.value = '';
                result.value = '';
            });

            // Copy button functionality
            copyBtn.addEventListener('click', function() {
                result.select();
                document.execCommand('copy');
                
                // Show feedback
                const originalText = this.innerHTML;
                this.innerHTML = 'Copied! <i class="fas fa-check"></i>';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });

            // Cipher type change handler
            cipherTypeSelect.addEventListener('change', function() {
                const cipherType = this.value;
                cipherOptions.style.display = 'block';
                cipherOptions.innerHTML = '';
                
                if (!cipherType) {
                    cipherOptions.style.display = 'none';
                    return;
                }
                
                // Create options based on cipher type
                let optionsHTML = '';
                
                switch(cipherType) {
                    // Monoalphabetic ciphers
                    case 'additive':
                        optionsHTML = `
                            <div class="option-row">
                                <div class="option-item">
                                    <label for="additive-key">Shift Key (1-25):</label>
                                    <input type="number" id="additive-key" min="1" max="25" value="3">
                                </div>
                            </div>
                        `;
                        break;
                        
                    case 'multiplicative':
                        optionsHTML = `
                            <div class="option-row">
                                <div class="option-item">
                                    <label for="multiplicative-key">Multiplier Key (must be coprime with 26):</label>
                                    <input type="number" id="multiplicative-key" min="1" max="25" value="5">
                                </div>
                            </div>
                        `;
                        break;
                        
                    case 'affine':
                        optionsHTML = `
                            <div class="option-row">
                                <div class="option-item">
                                    <label for="affine-key-a">Multiplier Key (a, coprime with 26):</label>
                                    <input type="number" id="affine-key-a" min="1" max="25" value="5">
                                </div>
                                <div class="option-item">
                                    <label for="affine-key-b">Shift Key (b):</label>
                                    <input type="number" id="affine-key-b" min="1" max="25" value="8">
                                </div>
                            </div>
                        `;
                        break;
                        
                    // Polyalphabetic ciphers
                    case 'vigenere':
                        optionsHTML = `
                            <div class="option-row">
                                <div class="option-item">
                                    <label for="vigenere-key">Keyword:</label>
                                    <input type="text" id="vigenere-key" value="KEY">
                                </div>
                            </div>
                        `;
                        break;
                        
                    case 'playfair':
                        optionsHTML = `
                            <div class="option-row">
                                <div class="option-item">
                                    <label for="playfair-key">Keyword:</label>
                                    <input type="text" id="playfair-key" value="PLAYFAIR">
                                </div>
                            </div>
                        `;
                        break;
                        
                    case 'hill':
                        optionsHTML = `
                            <div class="option-row">
                                <div class="option-item">
                                    <label for="hill-key">2x2 Matrix Key (4 numbers, space separated):</label>
                                    <input type="text" id="hill-key" value="5 8 17 3">
                                </div>
                            </div>
                        `;
                        break;
                        
                    case 'vernam':
                        optionsHTML = `
                            <div class="option-row">
                                <div class="option-item">
                                    <label for="vernam-key">One-time Pad Key (same length as message):</label>
                                    <input type="text" id="vernam-key" placeholder="Enter random key">
                                </div>
                            </div>
                        `;
                        break;
                        
                    // Transposition ciphers
                    case 'railfence':
                        optionsHTML = `
                            <div class="option-row">
                                <div class="option-item">
                                    <label for="railfence-key">Number of Rails:</label>
                                    <input type="number" id="railfence-key" min="2" max="10" value="3">
                                </div>
                            </div>
                        `;
                        break;
                        
                    case 'route':
                        optionsHTML = `
                            <div class="option-row">
                                <div class="option-item">
                                    <label for="route-key">Route Pattern:</label>
                                    <select id="route-key">
                                        <option value="spiral">Spiral</option>
                                        <option value="zigzag">Zigzag</option>
                                        <option value="row">Row-wise</option>
                                        <option value="column">Column-wise</option>
                                    </select>
                                </div>
                                <div class="option-item">
                                    <label for="route-direction">Direction:</label>
                                    <select id="route-direction">
                                        <option value="clockwise">Clockwise</option>
                                        <option value="counterclockwise">Counter-clockwise</option>
                                    </select>
                                </div>
                            </div>
                        `;
                        break;
                        
                    case 'columnar':
                        optionsHTML = `
                            <div class="option-row">
                                <div class="option-item">
                                    <label for="columnar-key">Keyword:</label>
                                    <input type="text" id="columnar-key" value="COLUMN">
                                </div>
                            </div>
                        `;
                        break;
                        
                    case 'double':
                        optionsHTML = `
                            <div class="option-row">
                                <div class="option-item">
                                    <label for="double-key1">First Keyword:</label>
                                    <input type="text" id="double-key1" value="FIRST">
                                </div>
                                <div class="option-item">
                                    <label for="double-key2">Second Keyword:</label>
                                    <input type="text" id="double-key2" value="SECOND">
                                </div>
                            </div>
                        `;
                        break;
                        
                    case 'myszkowski':
                        optionsHTML = `
                            <div class="option-row">
                                <div class="option-item">
                                    <label for="myszkowski-key">Keyword (with repeated letters):</label>
                                    <input type="text" id="myszkowski-key" value="MYSZKOWSKI">
                                </div>
                            </div>
                        `;
                        break;
                        
                    case 'disruptive':
                        optionsHTML = `
                            <div class="option-row">
                                <div class="option-item">
                                    <label for="disruptive-key">Keyword:</label>
                                    <input type="text" id="disruptive-key" value="DISRUPT">
                                </div>
                                <div class="option-item">
                                    <label for="disruptive-fill">Fill Character:</label>
                                    <input type="text" id="disruptive-fill" maxlength="1" value="X">
                                </div>
                            </div>
                        `;
                        break;
                }
                
                cipherOptions.innerHTML = optionsHTML;
            });

            // Encryption/Decryption button handlers
            encryptBtn.addEventListener('click', function() {
                const cipherType = cipherTypeSelect.value;
                const text = plaintext.value.trim();
                
                if (!cipherType) {
                    alert('Please select a cipher type first');
                    return;
                }
                
                if (!text) {
                    alert('Please enter some text to encrypt');
                    return;
                }
                
                let encryptedText = '';
                
                switch(cipherType) {
                    case 'additive':
                        const additiveKey = document.getElementById('additive-key') ? parseInt(document.getElementById('additive-key').value) : 3;
                        encryptedText = caesarCipher(text, additiveKey);
                        break;
                    case 'multiplicative':
                        const multiplicativeKey = document.getElementById('multiplicative-key') ? parseInt(document.getElementById('multiplicative-key').value) : 5;
                        encryptedText = multiplicativeCipher(text, multiplicativeKey);
                        break;
                    case 'affine':
                        const affineKeyA = document.getElementById('affine-key-a') ? parseInt(document.getElementById('affine-key-a').value) : 5;
                        const affineKeyB = document.getElementById('affine-key-b') ? parseInt(document.getElementById('affine-key-b').value) : 8;
                        encryptedText = affineCipher(text, affineKeyA, affineKeyB);
                        break;
                    case 'vigenere':
                        const vigenereKey = document.getElementById('vigenere-key') ? document.getElementById('vigenere-key').value : 'KEY';
                        encryptedText = vigenereCipher(text, vigenereKey, true);
                        break;
                    case 'playfair':
                        const playfairKey = document.getElementById('playfair-key') ? document.getElementById('playfair-key').value : 'PLAYFAIR';
                        encryptedText = playfairCipher(text, playfairKey, true);
                        break;
                    case 'hill':
                        const hillKey = document.getElementById('hill-key') ? document.getElementById('hill-key').value : '5 8 17 3';
                        encryptedText = hillCipher(text, hillKey, true);
                        break;
                    case 'vernam':
                        const vernamKey = document.getElementById('vernam-key') ? document.getElementById('vernam-key').value : generateRandomKey(text.length);
                        encryptedText = vernamCipher(text, vernamKey);
                        break;
                    case 'railfence':
                        const railfenceKey = document.getElementById('railfence-key') ? parseInt(document.getElementById('railfence-key').value) : 3;
                        encryptedText = railFenceCipher(text, railfenceKey, true);
                        break;
                    case 'route':
                        const routeKey = document.getElementById('route-key') ? document.getElementById('route-key').value : 'spiral';
                        const routeDirection = document.getElementById('route-direction') ? document.getElementById('route-direction').value : 'clockwise';
                        encryptedText = routeCipher(text, routeKey, routeDirection, true);
                        break;
                    case 'columnar':
                        const columnarKey = document.getElementById('columnar-key') ? document.getElementById('columnar-key').value : 'COLUMN';
                        encryptedText = columnarCipher(text, columnarKey, true);
                        break;
                    case 'double':
                        const doubleKey1 = document.getElementById('double-key1') ? document.getElementById('double-key1').value : 'FIRST';
                        const doubleKey2 = document.getElementById('double-key2') ? document.getElementById('double-key2').value : 'SECOND';
                        encryptedText = doubleTranspositionCipher(text, doubleKey1, doubleKey2, true);
                        break;
                    case 'myszkowski':
                        const myszkowskiKey = document.getElementById('myszkowski-key') ? document.getElementById('myszkowski-key').value : 'MYSZKOWSKI';
                        encryptedText = myszkowskiCipher(text, myszkowskiKey, true);
                        break;
                    case 'disruptive':
                        const disruptiveKey = document.getElementById('disruptive-key') ? document.getElementById('disruptive-key').value : 'DISRUPT';
                        const disruptiveFill = document.getElementById('disruptive-fill') ? document.getElementById('disruptive-fill').value : 'X';
                        encryptedText = disruptiveColumnarCipher(text, disruptiveKey, disruptiveFill, true);
                        break;
                    default:
                        alert('Selected cipher not implemented yet');
                        return;
                }
                
                result.value = encryptedText;
            });
            
            decryptBtn.addEventListener('click', function() {
                const cipherType = cipherTypeSelect.value;
                const text = plaintext.value.trim();
                
                if (!cipherType) {
                    alert('Please select a cipher type first');
                    return;
                }
                
                if (!text) {
                    alert('Please enter some text to decrypt');
                    return;
                }
                
                let decryptedText = '';
                
                switch(cipherType) {
                    case 'additive':
                        const additiveKey = document.getElementById('additive-key') ? parseInt(document.getElementById('additive-key').value) : 3;
                        decryptedText = caesarCipher(text, -additiveKey);
                        break;
                    case 'multiplicative':
                        const multiplicativeKey = document.getElementById('multiplicative-key') ? parseInt(document.getElementById('multiplicative-key').value) : 5;
                        decryptedText = multiplicativeCipher(text, modInverse(multiplicativeKey, 26));
                        break;
                    case 'affine':
                        const affineKeyA = document.getElementById('affine-key-a') ? parseInt(document.getElementById('affine-key-a').value) : 5;
                        const affineKeyB = document.getElementById('affine-key-b') ? parseInt(document.getElementById('affine-key-b').value) : 8;
                        decryptedText = affineCipher(text, modInverse(affineKeyA, 26), -affineKeyB * modInverse(affineKeyA, 26) % 26);
                        break;
                    case 'vigenere':
                        const vigenereKey = document.getElementById('vigenere-key') ? document.getElementById('vigenere-key').value : 'KEY';
                        decryptedText = vigenereCipher(text, vigenereKey, false);
                        break;
                    case 'playfair':
                        const playfairKey = document.getElementById('playfair-key') ? document.getElementById('playfair-key').value : 'PLAYFAIR';
                        decryptedText = playfairCipher(text, playfairKey, false);
                        break;
                    case 'hill':
                        const hillKey = document.getElementById('hill-key') ? document.getElementById('hill-key').value : '5 8 17 3';
                        decryptedText = hillCipher(text, hillKey, false);
                        break;
                    case 'vernam':
                        const vernamKey = document.getElementById('vernam-key') ? document.getElementById('vernam-key').value : generateRandomKey(text.length);
                        decryptedText = vernamCipher(text, vernamKey);
                        break;
                    case 'railfence':
                        const railfenceKey = document.getElementById('railfence-key') ? parseInt(document.getElementById('railfence-key').value) : 3;
                        decryptedText = railFenceCipher(text, railfenceKey, false);
                        break;
                    case 'route':
                        const routeKey = document.getElementById('route-key') ? document.getElementById('route-key').value : 'spiral';
                        const routeDirection = document.getElementById('route-direction') ? document.getElementById('route-direction').value : 'clockwise';
                        decryptedText = routeCipher(text, routeKey, routeDirection, false);
                        break;
                    case 'columnar':
                        const columnarKey = document.getElementById('columnar-key') ? document.getElementById('columnar-key').value : 'COLUMN';
                        decryptedText = columnarCipher(text, columnarKey, false);
                        break;
                    case 'double':
                        const doubleKey1 = document.getElementById('double-key1') ? document.getElementById('double-key1').value : 'FIRST';
                        const doubleKey2 = document.getElementById('double-key2') ? document.getElementById('double-key2').value : 'SECOND';
                        decryptedText = doubleTranspositionCipher(text, doubleKey1, doubleKey2, false);
                        break;
                    case 'myszkowski':
                        const myszkowskiKey = document.getElementById('myszkowski-key') ? document.getElementById('myszkowski-key').value : 'MYSZKOWSKI';
                        decryptedText = myszkowskiCipher(text, myszkowskiKey, false);
                        break;
                    case 'disruptive':
                        const disruptiveKey = document.getElementById('disruptive-key') ? document.getElementById('disruptive-key').value : 'DISRUPT';
                        const disruptiveFill = document.getElementById('disruptive-fill') ? document.getElementById('disruptive-fill').value : 'X';
                        decryptedText = disruptiveColumnarCipher(text, disruptiveKey, disruptiveFill, false);
                        break;
                    default:
                        alert('Selected cipher not implemented yet');
                        return;
                }
                
                result.value = decryptedText;
            });

            // Cipher implementations
            function caesarCipher(text, shift) {
                shift = ((shift % 26) + 26) % 26; // Ensure shift is positive and within 0-25
                return text.replace(/[a-z]/gi, function(c) {
                    const base = c < 'a' ? 65 : 97;
                    return String.fromCharCode((c.charCodeAt(0) - base + shift) % 26 + base);
                });
            }
            
            function multiplicativeCipher(text, key) {
                if (gcd(key, 26) !== 1) {
                    alert('Key must be coprime with 26 (gcd(key,26)=1)');
                    return text;
                }
                
                return text.replace(/[a-z]/gi, function(c) {
                    const base = c < 'a' ? 65 : 97;
                    const code = c.charCodeAt(0) - base;
                    return String.fromCharCode((code * key) % 26 + base);
                });
            }
            
            function affineCipher(text, a, b) {
                if (gcd(a, 26) !== 1) {
                    alert('Key a must be coprime with 26 (gcd(a,26)=1)');
                    return text;
                }
                
                b = ((b % 26) + 26) % 26; // Ensure b is positive
                
                return text.replace(/[a-z]/gi, function(c) {
                    const base = c < 'a' ? 65 : 97;
                    const code = c.charCodeAt(0) - base;
                    return String.fromCharCode((code * a + b) % 26 + base);
                });
            }
            
            function vigenereCipher(text, key, encrypt) {
                key = key.toUpperCase().replace(/[^A-Z]/g, '');
                if (!key) key = 'A';
                
                let keyIndex = 0;
                return text.replace(/[a-z]/gi, function(c) {
                    const base = c < 'a' ? 65 : 97;
                    const code = c.charCodeAt(0) - base;
                    const keyCode = key.charCodeAt(keyIndex % key.length) - 65;
                    
                    keyIndex++;
                    return String.fromCharCode(
                        ((encrypt ? code + keyCode : code - keyCode + 26) % 26) + base
                    );
                });
            }
            
            function playfairCipher(text, key, encrypt) {
                // Create Playfair square
                key = key.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
                const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
                let square = [];
                let used = new Set();
                
                // Add key letters
                for (let c of key) {
                    if (!used.has(c)) {
                        square.push(c);
                        used.add(c);
                    }
                }
                
                // Add remaining letters
                for (let c of alphabet) {
                    if (!used.has(c)) {
                        square.push(c);
                        used.add(c);
                    }
                }
                
                // Process text
                text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
                if (text.length % 2 !== 0) text += 'X';
                
                let result = '';
                                // Process text pairs
                for (let i = 0; i < text.length; i += 2) {
                    const a = text[i];
                    const b = text[i+1] || 'X';
                    
                    const aPos = square.indexOf(a);
                    const bPos = square.indexOf(b);
                    
                    const aRow = Math.floor(aPos / 5);
                    const aCol = aPos % 5;
                    const bRow = Math.floor(bPos / 5);
                    const bCol = bPos % 5;
                    
                    let newAPos, newBPos;
                    
                    if (aRow === bRow) {
                        // Same row
                        newAPos = aRow * 5 + ((aCol + (encrypt ? 1 : -1) + 5) % 5);
                        newBPos = bRow * 5 + ((bCol + (encrypt ? 1 : -1) + 5) % 5);
                    } else if (aCol === bCol) {
                        // Same column
                        newAPos = ((aRow + (encrypt ? 1 : -1) + 5) % 5) * 5 + aCol;
                        newBPos = ((bRow + (encrypt ? 1 : -1) + 5) % 5) * 5 + bCol;
                    } else {
                        // Rectangle
                        newAPos = aRow * 5 + bCol;
                        newBPos = bRow * 5 + aCol;
                    }
                    
                    result += square[newAPos] + square[newBPos];
                }
                
                return result;
            }
            
            function hillCipher(text, key, encrypt) {
                // Parse key matrix
                const keyParts = key.split(/\s+/).map(Number);
                if (keyParts.length !== 4 || keyParts.some(isNaN)) {
                    alert('Invalid Hill cipher key. Please enter 4 numbers separated by spaces.');
                    return text;
                }
                
                const keyMatrix = [
                    [keyParts[0], keyParts[1]],
                    [keyParts[2], keyParts[3]]
                ];
                
                const det = keyMatrix[0][0] * keyMatrix[1][1] - keyMatrix[0][1] * keyMatrix[1][0];
                if (gcd(det, 26) !== 1) {
                    alert('Key matrix determinant must be coprime with 26');
                    return text;
                }
                
                // Process text
                text = text.toUpperCase().replace(/[^A-Z]/g, '');
                if (text.length % 2 !== 0) text += 'X';
                
                let result = '';
                for (let i = 0; i < text.length; i += 2) {
                    const a = text.charCodeAt(i) - 65;
                    const b = text.charCodeAt(i+1) - 65;
                    
                    let c, d;
                    if (encrypt) {
                        c = (keyMatrix[0][0] * a + keyMatrix[0][1] * b) % 26;
                        d = (keyMatrix[1][0] * a + keyMatrix[1][1] * b) % 26;
                    } else {
                        // Calculate inverse matrix
                        const invDet = modInverse(det, 26);
                        const invMatrix = [
                            [(keyMatrix[1][1] * invDet) % 26, (-keyMatrix[0][1] * invDet) % 26],
                            [(-keyMatrix[1][0] * invDet) % 26, (keyMatrix[0][0] * invDet) % 26]
                        ];
                        
                        c = (invMatrix[0][0] * a + invMatrix[0][1] * b) % 26;
                        d = (invMatrix[1][0] * a + invMatrix[1][1] * b) % 26;
                    }
                    
                    result += String.fromCharCode((c + 26) % 26 + 65) + 
                               String.fromCharCode((d + 26) % 26 + 65);
                }
                
                return result;
            }
            
            function vernamCipher(text, key) {
                text = text.toUpperCase().replace(/[^A-Z]/g, '');
                key = key.toUpperCase().replace(/[^A-Z]/g, '');
                
                if (key.length < text.length) {
                    alert('Vernam cipher key must be at least as long as the message');
                    return text;
                }
                
                let result = '';
                for (let i = 0; i < text.length; i++) {
                    const textCode = text.charCodeAt(i) - 65;
                    const keyCode = key.charCodeAt(i % key.length) - 65;
                    result += String.fromCharCode((textCode ^ keyCode) % 26 + 65);
                }
                
                return result;
            }
            
            function railFenceCipher(text, rails, encrypt) {
                if (rails < 2) rails = 2;
                
                if (encrypt) {
                    const fence = Array(rails).fill().map(() => []);
                    let rail = 0;
                    let direction = 1;
                    
                    for (let c of text) {
                        fence[rail].push(c);
                        rail += direction;
                        if (rail === rails - 1 || rail === 0) direction *= -1;
                    }
                    
                    return fence.flat().join('');
                } else {
                    // Decryption is more complex
                    const pattern = [];
                    let rail = 0;
                    let direction = 1;
                    
                    for (let i = 0; i < text.length; i++) {
                        pattern.push(rail);
                        rail += direction;
                        if (rail === rails - 1 || rail === 0) direction *= -1;
                    }
                    
                    const fence = Array(rails).fill().map(() => []);
                    for (let i = 0; i < text.length; i++) {
                        fence[pattern[i]].push(i);
                    }
                    
                    const indices = fence.flat();
                    const result = Array(text.length);
                    
                    for (let i = 0; i < text.length; i++) {
                        result[indices[i]] = text[i];
                    }
                    
                    return result.join('');
                }
            }
            
            function routeCipher(text, pattern, direction, encrypt) {
                // This is a simplified implementation
                const size = Math.ceil(Math.sqrt(text.length));
                while (text.length < size * size) text += 'X';
                
                if (encrypt) {
                    const grid = [];
                    for (let i = 0; i < size; i++) {
                        grid.push(text.substr(i * size, size).split(''));
                    }
                    
                    let result = '';
                    if (pattern === 'spiral') {
                        // Spiral traversal
                        let top = 0, bottom = size - 1, left = 0, right = size - 1;
                        
                        while (top <= bottom && left <= right) {
                            // Top row
                            for (let i = left; i <= right; i++) {
                                result += grid[top][i];
                            }
                            top++;
                            
                            // Right column
                            for (let i = top; i <= bottom; i++) {
                                result += grid[i][right];
                            }
                            right--;
                            
                            if (top <= bottom) {
                                // Bottom row
                                for (let i = right; i >= left; i--) {
                                    result += grid[bottom][i];
                                }
                                bottom--;
                            }
                            
                            if (left <= right) {
                                // Left column
                                for (let i = bottom; i >= top; i--) {
                                    result += grid[i][left];
                                }
                                left++;
                            }
                        }
                    } else {
                        // Simple row-wise or column-wise
                        for (let i = 0; i < size; i++) {
                            for (let j = 0; j < size; j++) {
                                if (pattern === 'row') {
                                    result += grid[i][j];
                                } else {
                                    result += grid[j][i];
                                }
                            }
                        }
                    }
                    
                    return result;
                } else {
                    // Decryption would be the reverse process
                    return "Route cipher decryption not fully implemented";
                }
            }
            
            function columnarCipher(text, key, encrypt) {
                key = key.toUpperCase().replace(/[^A-Z]/g, '');
                if (!key) key = 'A';
                
                const keyOrder = Array.from(key).map((c, i) => ({char: c, index: i}))
                    .sort((a, b) => a.char.localeCompare(b.char) || a.index - b.index);
                
                const cols = key.length;
                const rows = Math.ceil(text.length / cols);
                
                if (encrypt) {
                    // Pad text if needed
                    while (text.length < rows * cols) text += 'X';
                    
                    // Create grid
                    const grid = [];
                    for (let i = 0; i < rows; i++) {
                        grid.push(text.substr(i * cols, cols).split(''));
                    }
                    
                    // Read columns in key order
                    let result = '';
                    for (let {index} of keyOrder) {
                        for (let row = 0; row < rows; row++) {
                            result += grid[row][index];
                        }
                    }
                    
                    return result;
                } else {
                    // Decryption
                    const colsOrder = keyOrder.map(({index}, i) => ({original: index, sorted: i}))
                        .sort((a, b) => a.original - b.original);
                    
                    const colLength = Math.ceil(text.length / key.length);
                    const result = Array(text.length);
                    
                    let pos = 0;
                    for (let {sorted} of colsOrder) {
                        for (let row = 0; row < colLength; row++) {
                            const textPos = sorted * colLength + row;
                            if (textPos < text.length) {
                                result[row * key.length + sorted] = text[pos++];
                            }
                        }
                    }
                    
                    return result.join('').replace(/X+$/, '');
                }
            }
            
            function doubleTranspositionCipher(text, key1, key2, encrypt) {
                if (encrypt) {
                    return columnarCipher(columnarCipher(text, key1, true), key2, true);
                } else {
                    return columnarCipher(columnarCipher(text, key2, false), key1, false);
                }
            }
            
            function myszkowskiCipher(text, key, encrypt) {
                key = key.toUpperCase().replace(/[^A-Z]/g, '');
                if (!key) key = 'A';
                
                // Create key with positions of repeated letters
                const keyChars = Array.from(key);
                const keyGroups = {};
                
                keyChars.forEach((c, i) => {
                    if (!keyGroups[c]) keyGroups[c] = [];
                    keyGroups[c].push(i);
                });
                
                const cols = key.length;
                const rows = Math.ceil(text.length / cols);
                
                if (encrypt) {
                    // Pad text if needed
                    while (text.length < rows * cols) text += 'X';
                    
                    // Create grid
                    const grid = [];
                    for (let i = 0; i < rows; i++) {
                        grid.push(text.substr(i * cols, cols).split(''));
                    }
                    
                    // Read columns in key order, grouping repeated letters
                    let result = '';
                    const processedCols = new Set();
                    
                    for (let c of Object.keys(keyGroups).sort()) {
                        const indices = keyGroups[c];
                        if (indices.length > 1) {
                            // Group columns for repeated letters
                            for (let row = 0; row < rows; row++) {
                                for (let col of indices) {
                                    result += grid[row][col];
                                }
                            }
                        } else {
                            // Single column
                            const col = indices[0];
                            for (let row = 0; row < rows; row++) {
                                result += grid[row][col];
                            }
                        }
                    }
                    
                    return result;
                } else {
                    // Decryption is more complex
                    return "Myszkowski decryption not fully implemented";
                }
            }
            
            function disruptiveColumnarCipher(text, key, fillChar, encrypt) {
                key = key.toUpperCase().replace(/[^A-Z]/g, '');
                if (!key) key = 'A';
                fillChar = fillChar[0] || 'X';
                
                const keyOrder = Array.from(key).map((c, i) => ({char: c, index: i}))
                    .sort((a, b) => a.char.localeCompare(b.char) || a.index - b.index);
                
                const cols = key.length;
                const rows = Math.ceil(text.length / cols);
                
                if (encrypt) {
                    // Create grid with fill characters
                    const grid = Array(rows).fill().map(() => Array(cols).fill(fillChar));
                    
                    // Fill grid diagonally
                    let textIndex = 0;
                    for (let sum = 0; sum < rows + cols - 1; sum++) {
                        for (let row = Math.max(0, sum - cols + 1); row <= Math.min(sum, rows - 1); row++) {
                            const col = sum - row;
                            if (textIndex < text.length) {
                                grid[row][col] = text[textIndex++];
                            }
                        }
                    }
                    
                    // Read columns in key order
                    let result = '';
                    for (let {index} of keyOrder) {
                        for (let row = 0; row < rows; row++) {
                            result += grid[row][index];
                        }
                    }
                    
                    return result;
                } else {
                    // Decryption is more complex
                    return "Disruptive columnar decryption not fully implemented";
                }
            }
            
            // Helper functions
            function gcd(a, b) {
                a = Math.abs(a);
                b = Math.abs(b);
                
                while (b) {
                    [a, b] = [b, a % b];
                }
                return a;
            }
            
            function modInverse(a, m) {
                a = ((a % m) + m) % m;
                for (let x = 1; x < m; x++) {
                    if ((a * x) % m === 1) return x;
                }
                return 1;
            }
            
            function generateRandomKey(length) {
                let key = '';
                for (let i = 0; i < length; i++) {
                    key += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
                }
                return key;
            }
        });