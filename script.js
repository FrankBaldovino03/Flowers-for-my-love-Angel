// ===== ACTIVACIÓN INMEDIATA DE MÚSICA =====
document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isPlaying = false;
    
    console.log('🎵 Página cargada, activando música INMEDIATAMENTE...');
    console.log('🎵 Elemento de audio:', backgroundMusic);
    console.log('🎵 Fuente de audio:', backgroundMusic.src);
    
    // Configurar volumen a máximo y quitar mute
    backgroundMusic.volume = 1.0;
    backgroundMusic.muted = false;
    console.log('🎵 Volumen configurado al 100%, mute desactivado');
    
    // Función para activar música inmediatamente
    function activateMusicNow() {
        console.log('🎵 ACTIVANDO MÚSICA AHORA...');
        
        backgroundMusic.play().then(() => {
            console.log('✅ MÚSICA ACTIVADA EXITOSAMENTE');
            isPlaying = true;
            
            // Ocultar indicador de carga
            const loadingIndicator = document.getElementById('musicLoading');
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        }).catch(e => {
            console.error('❌ Error al activar música:', e);
            console.error('❌ Tipo de error:', e.name);
            
            // Intentar de nuevo inmediatamente
            setTimeout(() => {
                console.log('🎵 Reintentando activación...');
                backgroundMusic.play().catch(e2 => {
                    console.error('❌ Segundo intento falló:', e2);
                });
            }, 100);
        });
    }
    
    // Activar música INMEDIATAMENTE
    activateMusicNow();
    
    // Múltiples intentos de activación
    setTimeout(activateMusicNow, 100);
    setTimeout(activateMusicNow, 500);
    setTimeout(activateMusicNow, 1000);
    setTimeout(activateMusicNow, 2000);
});

onload = () => {
    document.body.classList.remove("container");
    
    // ===== SISTEMA DE PANTALLA DE BIENVENIDA =====
    const welcomeScreen = document.getElementById('welcomeScreen');
    const openGiftBtn = document.getElementById('openGiftBtn');
    const flowersContainer = document.querySelector('.flowers');
    const nightContainer = document.querySelector('.night');
    
    // Ocultar las flores inicialmente
    if (flowersContainer) {
        flowersContainer.style.display = 'none';
    }
    if (nightContainer) {
        nightContainer.style.display = 'none';
    }
    
    // ===== EFECTO DE ESCRITURA (TYPEWRITER) =====
    function typeWriter(element, text, speed = 100, delay = 0) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let i = 0;
                element.innerHTML = '';
                
                function type() {
                    if (i < text.length) {
                        element.innerHTML += text.charAt(i);
                        i++;
                        
                        // Efecto de brillo al escribir cada letra
                        element.style.textShadow = `0 0 ${10 + (i * 2)}px currentColor`;
                        
                        setTimeout(type, speed);
                    } else {
                        // Agregar cursor parpadeante al final
                        element.innerHTML += '<span class="typewriter-cursor"></span>';
                        
                        // Efecto de brillo final
                        element.style.animation = 'glow 2s ease-in-out infinite alternate';
                        
                        resolve();
                    }
                }
                
                type();
            }, delay);
        });
    }
    
    // Función para iniciar la secuencia de escritura
    async function startTypewriterSequence() {
        console.log('⌨️ Iniciando secuencia de escritura...');
        
        // Textos a escribir con diferentes velocidades y pausas
        const texts = [
            { 
                id: 'text1', 
                text: 'FELIZ DÍA DE LAS FLORES', 
                speed: 80, 
                delay: 1000 
            },
            { 
                id: 'text2', 
                text: 'AMARILLAS', 
                speed: 120, 
                delay: 1000 
            },
            { 
                id: 'text3', 
                text: 'AMOR MÍO', 
                speed: 100, 
                delay: 800 
            },
            { 
                id: 'text4', 
                text: 'TENGO UN REGALO ESPECIAL PARA TI', 
                speed: 50, 
                delay: 1200 
            }
        ];
        
        // Escribir cada texto secuencialmente
        for (const textConfig of texts) {
            const element = document.getElementById(textConfig.id);
            if (element) {
                console.log(`⌨️ Escribiendo: ${textConfig.text}`);
                await typeWriter(element, textConfig.text, textConfig.speed, textConfig.delay);
                
                // Pausa dramática entre textos
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
        
        // Mostrar el botón después de escribir todo con efecto dramático
        setTimeout(() => {
            if (openGiftBtn) {
                console.log('🎁 Mostrando botón de regalo...');
                openGiftBtn.style.opacity = '1';
                openGiftBtn.style.transform = 'translateY(0)';
                openGiftBtn.style.animation = 'fadeInUp 1s ease-out, pulse 2s infinite 1s';
            }
        }, 1500);
    }
    
    // Iniciar la secuencia de escritura cuando la página esté lista
    setTimeout(startTypewriterSequence, 1000);
    
    // Función para mostrar las flores
    function showFlowers() {
        console.log('🌸 Mostrando flores...');
        
        // Ocultar pantalla de bienvenida con animación
        if (welcomeScreen) {
            welcomeScreen.style.animation = 'fadeOut 1s ease-out forwards';
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
            }, 1000);
        }
        
        // Mostrar las flores con animación
        if (flowersContainer) {
            flowersContainer.style.display = 'block';
            flowersContainer.style.animation = 'fadeIn 2s ease-out';
        }
        if (nightContainer) {
            nightContainer.style.display = 'block';
            nightContainer.style.animation = 'fadeIn 2s ease-out';
        }
        
        // Activar música cuando se muestren las flores
        activateMusicForFlowers();
    }
    
    // Event listener para el botón de abrir regalo
    if (openGiftBtn) {
        openGiftBtn.addEventListener('click', showFlowers);
    }
    
    
    // ===== SISTEMA DE MÚSICA SIMPLE =====
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isPlaying = false;
    
    console.log('🎵 Inicializando sistema de música...');
    console.log('🎵 Elemento de audio:', backgroundMusic);
    console.log('🎵 Fuente de audio:', backgroundMusic.src);
    
    // Configurar volumen a máximo
    backgroundMusic.volume = 1.0;
    backgroundMusic.muted = false;
    console.log('🎵 Volumen configurado al 100%');
    
    // Función para activar música cuando se muestren las flores
    function activateMusicForFlowers() {
        console.log('🎵 Activando música para las flores...');
        
        // Mostrar indicador de carga
        const loadingIndicator = document.getElementById('musicLoading');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
        }
        
        // Activar música
        playMusic();
    }
    
    // Función simple para activar música
    function playMusic() {
        console.log('🎵 Intentando reproducir música...');
        
        backgroundMusic.play().then(() => {
            console.log('✅ Música reproducida exitosamente');
            isPlaying = true;
            
            // Ocultar indicador de carga
            const loadingIndicator = document.getElementById('musicLoading');
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        }).catch(e => {
            console.error('❌ Error al reproducir:', e);
            console.error('❌ Tipo de error:', e.name);
        });
    }
    
    // Detectar cuando la música empieza a reproducir
    backgroundMusic.addEventListener('play', () => {
        console.log('▶️ Música empezó a reproducir');
        isPlaying = true;
        
        // Ocultar indicador de carga
        const loadingIndicator = document.getElementById('musicLoading');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    });
    
    // Detectar cuando la música se pausa
    backgroundMusic.addEventListener('pause', () => {
        console.log('⏸️ Música pausada');
        isPlaying = false;
    });
    
    // Detectar errores de carga
    backgroundMusic.addEventListener('error', (e) => {
        console.error('❌ Error en el elemento de audio:', e);
        console.error('❌ Código de error:', backgroundMusic.error?.code);
        console.error('❌ Mensaje de error:', backgroundMusic.error?.message);
    });
    
    // Detectar cuando el archivo se puede reproducir
    backgroundMusic.addEventListener('canplay', () => {
        console.log('✅ Archivo listo para reproducir');
        if (!isPlaying) {
            playMusic();
        }
    });
    
    // Detectar cuando el archivo se cargó completamente
    backgroundMusic.addEventListener('loadeddata', () => {
        console.log('✅ Archivo cargado completamente');
        console.log('✅ Duración:', backgroundMusic.duration);
        if (!isPlaying) {
            playMusic();
        }
    });
    
    // Intentar reproducir inmediatamente
    playMusic();
    
    // Intentar después de 1 segundo
    setTimeout(() => {
        if (!isPlaying) {
            console.log('🎵 Segundo intento...');
            playMusic();
        }
    }, 1000);
    
    // Intentar después de 2 segundos
    setTimeout(() => {
        if (!isPlaying) {
            console.log('🎵 Tercer intento...');
            playMusic();
        }
    }, 2000);
    
    // Intentar después de 3 segundos
    setTimeout(() => {
        if (!isPlaying) {
            console.log('🎵 Cuarto intento...');
            playMusic();
        }
    }, 3000);
    
    // Ocultar indicador de carga después de 5 segundos
    setTimeout(() => {
        const loadingIndicator = document.getElementById('musicLoading');
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    }, 5000);
    
    // Activar música cuando la página esté completamente cargada
    window.addEventListener('load', () => {
        console.log('🎵 Página cargada, activando música...');
        if (!isPlaying) {
            playMusic();
        }
    });
    
    // Activar música cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🎵 DOM listo, activando música...');
        if (!isPlaying) {
            playMusic();
        }
    });
    
    // Botón de prueba temporal
    const testMusicBtn = document.getElementById('testMusic');
    if (testMusicBtn) {
        testMusicBtn.addEventListener('click', () => {
            console.log('🎵 Botón de prueba clickeado');
            console.log('🎵 Estado actual:', isPlaying ? 'Reproduciendo' : 'Pausado');
            console.log('🎵 Volumen:', backgroundMusic.volume);
            console.log('🎵 Muted:', backgroundMusic.muted);
            console.log('🎵 Fuente:', backgroundMusic.src);
            console.log('🎵 Duración:', backgroundMusic.duration);
            console.log('🎵 Error:', backgroundMusic.error);
            
            // Forzar reproducción
            backgroundMusic.load();
            playMusic();
        });
    }
    
};