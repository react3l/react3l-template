import { storiesOf } from "@storybook/react";
import nameof from 'ts-nameof.macro';
import { AdvanceNumberFilterStories } from "./AdvanceNumberFilter/AdvanceNumberFilter.stories";
import { AdvanceStringFilterStories } from "./AdvanceStringFilter/AdvanceStringFilter.stories";
import { AdvanceIdFilterStories } from "./AdvanceIdFilter/AdvanceIdFilter.stories";
import { AdvanceDateFilterStories } from "./AdvanceDateFilter/AdvanceFilterDate.stories";


storiesOf('AdvanceFilter', module)
    .add(nameof(AdvanceNumberFilterStories), AdvanceNumberFilterStories)
    .add(nameof(AdvanceStringFilterStories), AdvanceStringFilterStories)
    .add(nameof(AdvanceIdFilterStories), AdvanceIdFilterStories)
    .add(nameof(AdvanceDateFilterStories), AdvanceDateFilterStories);