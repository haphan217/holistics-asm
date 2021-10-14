# Simple photo gallery

This website is a simple gallery of photos from [Unsplash](https://unsplash.com/).

## Main features

### 1. Masonry grid

To persist the original aspect ratio, photos are arranged in masonry grid by the following approach:

- Set number of columns depends on screen size through css (`column-count`). However, the photos are distributed from top to bottom as:
  1 3 5
  2 4 6
- Thus, the photos list will be sorted everytime it is updated to be distributed from left to right as:
  1 2 3
  4 5 6
- Use `<picture>` element for more flexibility in specifying image resources

### 2. Infinite scroll

Utilize **Intersection Observer API** to simulate infinite scrolling.

- Assign a reference to the last photo of the gallery. Initialize an Intersection observer to observe it.
- Once the last photo intersects the view port (be visible on screen), it triggers the gallery to fetch more photos.
- When the list of photos is updated, the observer disconnects with the previous last photo and starts observing the current last photo.

### 3. Carousel

This component consists of two child components. A main carousel displays photo in large size and a slider displays some thumbnail photos. The swipe event on both components are managed by the `react-swipeable` library.

- **Main carousel**

The photos are stacked upon each other but only the `active` photo is visible.

- **Thumbnail slider**

There are 5 thumbnail photos showed at a time. The states of the current visible photo in the main carousel are passed down to the thumbnail slider, so the activities on both components stay connected.

## Limitations

1. Carousel behaviors

- The photos are fade in/out when navigating, which don't simulate the "sliding" feeling.
- When user is at the last photo of the carousel, clicking next button will take they back to the first photo. It should instead fetch more photos and update the gallery.

2. Responsiveness

- Since the number of row spans of the photo is set on its first load, changing the screen size from large -> small -> large will result incorrect span. I can explain further in the follow-up discussion.
- The responsive layout for small screen size is not guaranteed :D

## Deployed site

The static website is hosted on Amazon S3 and served through a Cloudfront distribution.

[Let's go!](https://d3bxcmfcz1niap.cloudfront.net)
