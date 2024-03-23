import { AccesibilityToggle } from "@/components/common/accesibility/accesibility";
import { MenuCard } from "@/components/common/menu-card/menu-card";
import { MenuCardProps } from "@/components/common/menu-card/menu-card.types";
import { Button } from "@/components/ui/button";
import {
  Card
} from "@/components/ui/card";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";

export default function Home() {
  const menuCardProps: MenuCardProps = {
    variant: "discount",
    header: {
      time: {
        ariaLabel: "Aria label for time",
        min: 0,
        max: 100,
      },
      price: {
        value: 10,
        currency: "USD",
        ariaLabel: "Aria label for price",
        style: "LIGHT",
      },
      ariaLabel: "Aria label for header",
    },
    ariaLabel: "Aria label for MenuCard",
    primaryImage: {
      path: "https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg",
      alt: "Alt text for image",
      ariaLabel: "Aria label for image",
      labels: [
        {
          type: "DISCOUNT",
          ariaLabel: "Aria label for discount label",
          value: 20,
          position: "TOP",
        },
      ],
    },
    title: {
      label: "Title label",
      style: "BOLD",
      ariaLabel: "Aria label for title",
      alignment: "CENTER",
    },
    classification: {
      max: 5,
      min: 1,
      current: 3,
      ariaLabel: "Aria label for classification",
    },
    footerButtons: [
      {
        variant: "ADD",
        label: "Add",
        ariaLabel: "Aria label for Add button",
        ariaPressed: true,
        ariaExpanded: false,
      },
      {
        variant: "VIEW",
        label: "View",
        ariaLabel: "Aria label for View button",
        ariaPressed: false,
        ariaExpanded: true,
      },
    ],
    asChild: true,
    className: "custom-class",
  };

  const menuCardPropsStandard: MenuCardProps = {
    variant: "standard",
    header: {
      time: {
        ariaLabel: "Aria label for time",
        min: 0,
        max: 100,
      },
      price: {
        value: 10,
        currency: "USD",
        ariaLabel: "Aria label for price",
        style: "LIGHT",
      },
      ariaLabel: "Aria label for header",
    },
    ariaLabel: "Aria label for MenuCard",
    primaryImage: {
      path: "https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg",
      alt: "Alt text for image",
      ariaLabel: "Aria label for image",
      labels: [
        {
          type: "DISCOUNT",
          ariaLabel: "Aria label for discount label",
          value: 20,
          position: "TOP",
        },
      ],
    },
    title: {
      label: "Title label",
      style: "BOLD",
      ariaLabel: "Aria label for title",
      alignment: "CENTER",
    },
    classification: {
      max: 5,
      min: 1,
      current: 3,
      ariaLabel: "Aria label for classification",
    },
    footerButtons: [
      {
        variant: "ADD",
        label: "Add",
        ariaLabel: "Aria label for Add button",
        ariaPressed: true,
        ariaExpanded: false,
      },
      {
        variant: "VIEW",
        label: "View",
        ariaLabel: "Aria label for View button",
        ariaPressed: false,
        ariaExpanded: true,
      },
    ],
    asChild: true,
    className: "custom-class",
  };

  const menuCardPropsFull: MenuCardProps = {
    variant: "full",
    header: {
      time: {
        ariaLabel: "Aria label for time",
        min: 0,
        max: 100,
      },
      price: {
        value: 10,
        currency: "USD",
        ariaLabel: "Aria label for price",
        style: "LIGHT",
      },
      ariaLabel: "Aria label for header",
    },
    ariaLabel: "Aria label for MenuCard",
    primaryImage: {
      path: "https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg",
      alt: "Alt text for image",
      ariaLabel: "Aria label for image",
      labels: [
        {
          type: "DISCOUNT",
          ariaLabel: "Aria label for discount label",
          value: 20,
          position: "TOP",
        },
      ],
    },
    title: {
      label: "Title label",
      style: "BOLD",
      ariaLabel: "Aria label for title",
      alignment: "CENTER",
    },
    classification: {
      max: 5,
      min: 1,
      current: 3,
      ariaLabel: "Aria label for classification",
    },
    footerButtons: [
      {
        variant: "ADD",
        label: "Add",
        ariaLabel: "Aria label for Add button",
        ariaPressed: true,
        ariaExpanded: false,
      },
      {
        variant: "VIEW",
        label: "View",
        ariaLabel: "Aria label for View button",
        ariaPressed: false,
        ariaExpanded: true,
      },
    ],
    asChild: true,
    className: "custom-class",
  };

  const menuCardPropsGhost: MenuCardProps = {
    variant: "ghost",
    header: {
      time: {
        ariaLabel: "Aria label for time",
        min: 0,
        max: 100,
      },
      price: {
        value: 10,
        currency: "USD",
        ariaLabel: "Aria label for price",
        style: "LIGHT",
      },
      ariaLabel: "Aria label for header",
    },
    ariaLabel: "Aria label for MenuCard",
    primaryImage: {
      path: "https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg",
      alt: "Alt text for image",
      ariaLabel: "Aria label for image",
      labels: [
        {
          type: "DISCOUNT",
          ariaLabel: "Aria label for discount label",
          value: 20,
          position: "TOP",
        },
      ],
    },
    title: {
      label: "Title label",
      style: "BOLD",
      ariaLabel: "Aria label for title",
      alignment: "CENTER",
    },
    classification: {
      max: 5,
      min: 1,
      current: 3,
      ariaLabel: "Aria label for classification",
    },
    footerButtons: [
      {
        variant: "ADD",
        label: "Add",
        ariaLabel: "Aria label for Add button",
        ariaPressed: true,
        ariaExpanded: false,
      },
      {
        variant: "VIEW",
        label: "View",
        ariaLabel: "Aria label for View button",
        ariaPressed: false,
        ariaExpanded: true,
      },
    ],
    asChild: true,
    className: "custom-class",
  };

  return (
    <div>
      <AccesibilityToggle></AccesibilityToggle>
      <div>
        <Card>
          <Button variant="default">
            <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Info
          </Button>
        </Card>
        <Button variant="secondary">Menu</Button>
        <Button variant="secondary">
          <EnvelopeOpenIcon className=" h-4 w-4" />
        </Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      
      <MenuCard {...menuCardProps}>
      </MenuCard>
      <MenuCard {...menuCardPropsStandard}>
      </MenuCard>
      <MenuCard {...menuCardPropsFull}>
      </MenuCard>
      <MenuCard {...menuCardPropsGhost}>
      </MenuCard>
    </div>
  );
}
