# Implementation Plan: "How to use my iPod" Section

This plan outlines the steps to add a new menu item that displays a GIF demonstration of the iPod portfolio.

## Proposed Changes

### 1. Asset Preparation
- **File**: `public/how-to-use.gif`
- **Action**: Add a screen recording GIF showing how to navigate the interface using the click wheel.

### 2. Create the View Component
- **File**: `app/components/views/HowToUseView/index.tsx` [NEW]
- **Description**: Create a simple view that renders the GIF. It should follow the pattern of other views (like `ProfileView`) using `SelectableList`.

```tsx
import { SelectableList, SelectableListOption } from "components";
import { viewConfigMap } from "components/views";
import { useMenuHideView, useScrollHandler } from "hooks";
import styled from "styled-components";
import { Unit } from "utils/constants";

const GifContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${Unit.XL};
  text-align: center;
`;

const DemoGif = styled.img`
  width: 100%;
  max-width: 240px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  margin-bottom: ${Unit.MD};
`;

const Caption = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
`;

const HowToUseView = () => {
  useMenuHideView(viewConfigMap.howToUse.id);

  const options: SelectableListOption[] = [
    {
      type: "text",
      label: (
        <GifContainer>
          <DemoGif src="/how-to-use.gif" alt="How to use demonstration" />
          <Caption>
            Rotate your finger on the ClickWheel to scroll.
            Tap the center button to select.
            Press MENU to go back.
          </Caption>
        </GifContainer>
      ),
      selectable: false,
    }
  ];

  const [scrollIndex] = useScrollHandler(viewConfigMap.howToUse.id, options);

  return <SelectableList options={options} activeIndex={scrollIndex} />;
};

export default HowToUseView;
```

### 3. Register the View
- **File**: `app/components/views/index.ts` [MODIFY]
- **Action**: 
    1. Export the new `HowToUseView`.
    2. Add a `howToUse` entry to `viewConfigMap`.

```typescript
// ... existing imports
export { default as HowToUseView } from "./HowToUseView";

// ... inside viewConfigMap
  howToUse: {
    id: "howToUse",
    title: "How to use",
    type: "screen",
    isSplitScreen: false,
  },
```

### 4. Update the Home Menu
- **File**: `app/components/views/HomeView/index.tsx` [MODIFY]
- **Action**: Add "How to use my iPod" to the `options` array.

```tsx
// ... inside options array
      {
        type: "view",
        label: "How to use my iPod",
        sublabel: "Video guide",
        viewId: viewConfigMap.howToUse.id,
        component: () => <HowToUseView />,
      },
```

## Verification
1. Run `npm run dev`.
2. Navigate to "How to use my iPod" on the home screen.
3. Verify the GIF loads and the "MENU" button takes you back.
