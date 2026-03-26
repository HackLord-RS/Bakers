import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
    onComplete: () => void;
    videoSrc: string;
}

const SplashScreen = ({ onComplete, videoSrc }: SplashScreenProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => {
            console.log('Splash video loaded');
            setIsVideoLoaded(true);

            // Auto-play the video
            video.play().catch(err => {
                console.error('Auto-play failed:', err);
            });
        };

        const handleVideoEnd = () => {
            console.log('Splash video ended, transitioning...');
            setIsFadingOut(true);

            // Wait for fade out animation, then call onComplete
            setTimeout(() => {
                onComplete();
            }, 1000); // 1 second fade out
        };

        const handleError = (e: Event) => {
            console.error('Splash video failed to load:', e);
            // If video fails, skip to main site
            onComplete();
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('ended', handleVideoEnd);
        video.addEventListener('error', handleError);

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('ended', handleVideoEnd);
            video.removeEventListener('error', handleError);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isFadingOut ? 0 : 1 }}
                transition={{ duration: 1 }}
                className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
            >
                {/* Video */}
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    style={{ opacity: isVideoLoaded ? 1 : 0 }}
                    src={videoSrc}
                    muted
                    playsInline
                    preload="auto"
                />

                {/* Loading indicator (shown while video loads) */}
                {!isVideoLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                        <div className="text-gold-400 text-2xl font-sans tracking-widest animate-pulse">
                            THE BAKERS
                        </div>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

export default SplashScreen;
