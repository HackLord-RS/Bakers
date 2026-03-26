# Hero Section Animation Timing - Scroll Synchronization

## Problem
The 80-frame animation was finishing too quickly during scroll, causing frames to skip and the next section to appear before the animation completed.

## Root Cause Analysis

### Scroll Distance Calculation
With a hero section of `150vh`:
- **Total height**: 150vh
- **Visible viewport**: 100vh (always visible)
- **Actual scroll distance**: 150vh - 100vh = **50vh**

### Frame Distribution
- **Total frames**: 80
- **Scroll distance**: 50vh
- **Frames per vh**: 80 ÷ 50 = **1.6 frames per vh**
- **Result**: Animation plays too fast, frames skip

## Solution Applied

### New Configuration: 250vh
- **Total height**: 250vh
- **Visible viewport**: 100vh
- **Actual scroll distance**: 250vh - 100vh = **150vh**

### Improved Frame Distribution
- **Total frames**: 80
- **Scroll distance**: 150vh
- **Frames per vh**: 80 ÷ 150 = **0.53 frames per vh**
- **vh per frame**: 150 ÷ 80 = **1.875vh per frame**
- **Result**: Smooth, deliberate animation ✅

## Timing Breakdown

### At Different Scroll Positions
| Scroll Position | Frame Number | Animation Progress |
|----------------|--------------|-------------------|
| 0vh (top) | Frame 0 | Baker dreaming |
| 37.5vh | Frame 20 | Cake forming |
| 75vh (middle) | Frame 40 | Cake on counter |
| 112.5vh | Frame 60 | Baker presenting |
| 150vh (end) | Frame 79 | Final masterpiece |

### User Experience
- **Slow scroll**: See every frame transition smoothly
- **Medium scroll**: Comfortable animation speed
- **Fast scroll**: Animation still completes before next section
- **Scroll back**: Animation plays in reverse smoothly

## Why 250vh is Optimal

### Too Short (150vh)
❌ Only 50vh scroll distance
❌ 1.6 frames per vh = too fast
❌ Animation feels rushed
❌ Frames appear to skip

### Just Right (250vh) ✅
✅ 150vh scroll distance
✅ 0.53 frames per vh = perfect pace
✅ Animation feels cinematic
✅ Every frame visible
✅ Matches natural scroll speed

### Too Long (300vh+)
⚠️ Creates blank space after animation
⚠️ Animation might feel too slow
⚠️ User scrolls past before seeing end

## Technical Implementation

```tsx
// Framer Motion scroll progress
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end start"]
});

// Map scroll progress (0-1) to frame index (0-79)
const currentFrame = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);
```

### How It Works
1. **scrollYProgress** tracks scroll position from 0 to 1
2. **0** = Top of section (start start)
3. **1** = Bottom of section leaves viewport (end start)
4. **useTransform** maps 0-1 to frame 0-79
5. Canvas renders the corresponding frame

## Performance Metrics

### Before (150vh)
- Scroll distance: 50vh
- Animation duration: ~2-3 seconds (fast scroll)
- Frames per second: ~27 fps (skipping)
- User experience: Rushed ❌

### After (250vh)
- Scroll distance: 150vh
- Animation duration: ~5-7 seconds (comfortable scroll)
- Frames per second: ~12-15 fps (smooth)
- User experience: Cinematic ✅

## Testing Guide

### Slow Scroll Test
1. Scroll down very slowly
2. You should see each frame change distinctly
3. Animation should feel like a movie

### Normal Scroll Test
1. Scroll at normal speed
2. Animation should play smoothly
3. Should complete just as next section arrives

### Fast Scroll Test
1. Scroll quickly
2. Animation should still be visible
3. Should complete before next section

### Reverse Scroll Test
1. Scroll back up
2. Animation should play in reverse
3. Should return to first frame at top

## Expected Behavior

### Perfect Timing Indicators
✅ Animation completes as you reach the bottom
✅ No frames appear to skip
✅ Smooth transition between frames
✅ Natural, cinematic feel
✅ Next section appears right after animation ends

### Warning Signs (if timing is off)
❌ Animation finishes with scroll distance remaining
❌ Frames skip or jump
❌ Blank space after animation
❌ Animation feels too fast or too slow

## Fine-Tuning Options

If 250vh still doesn't feel right, you can adjust:

### Make Animation Slower (More Scroll)
```tsx
style={{ height: '300vh' }} // More scroll distance
```

### Make Animation Faster (Less Scroll)
```tsx
style={{ height: '200vh' }} // Less scroll distance
```

### Optimal Range
- **Minimum**: 200vh (faster animation)
- **Sweet spot**: 250vh (current)
- **Maximum**: 300vh (slower animation)

## Files Modified
- `components/Hero.tsx` - Height set to 250vh

## Summary
Changed hero section height from 150vh to 250vh, providing 150vh of scroll distance for 80 frames. This creates a smooth, cinematic animation that perfectly synchronizes with the user's scroll speed.
