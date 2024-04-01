import { AccesibilityToggle } from "@/components/common/accesibility/accesibility";
import CategoryButton from "@/components/common/category-button/category-button";
import CategoryButtonsBentoGrid from "@/components/common/category-button/category-buttons-bento-grid";
import { MenuCard } from "@/components/common/menu-card/menu-card";
import { MenuCardProps } from "@/components/common/menu-card/types/menu-card.types";
import { Button } from "@/components/ui/button";
import {
  Card
} from "@/components/ui/card";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";

export default function Home() {
  /*
  const menuCardProps: MenuCardProps = {
    variant: "discount",
    header: {
      time: {
        ariaLabel: "Aria label for time",
        min: 0,
        max: 100,
        scale: "minutes"
      },
      price: {
        value: 10,
        currency: "PEN",
        ariaLabel: "Aria label for price",
      },
      ariaLabel: "Aria label for header",
    },
    availableSizes: [
      {
        type: "PIECES",
        portion: 5,
        description: "Small pieces",
      },
      {
        type: "PIECES",
        portion: 11,
        description: "Large pieces",
      },
      {
        type: "PIECES",
        portion: 16,
        description: "Big pieces",
      }
    ],
    ariaLabel: "Aria label for MenuCard",
    primaryImage: {
      path: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
      alt: "Alt text for image",
      ariaLabel: "Aria label for image",
      labels: [
        {
          type: "SIZE",
          value: {
            type: "PIECES",
            portion: 10,
            description: "Small pieces",
          },
          priority: 1,
        },
        {
          type: "DISCOUNT",
          value: {
            amount: 10,
            unit: '%',
          },
          priority: 2,
        }
      ],
    },
    title: {
      label: "Title label",
      ariaLabel: "Aria label for title",
    },
    classification: {
      max: 5,
      min: 1,
      current: 2,
      ariaLabel: "Aria label for classification",
    },
    footerButtons: [
      {
        type: "ADD",
      },
      {
        type: "AR",
      },
    ],
    asChild: true,
  };

  const menuCardPropsStandard: MenuCardProps = {
    variant: "standard",
    header: {
      time: {
        ariaLabel: "Aria label for time",
        min: 0,
        max: 100,
        scale: "minutes"
      },
      price: {
        value: 10,
        currency: "USD",
        ariaLabel: "Aria label for price",
      },
      ariaLabel: "Aria label for header",
    },
    ariaLabel: "Aria label for MenuCard",
    primaryImage: {
      path: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
      alt: "Alt text for image",
      ariaLabel: "Aria label for image",
      labels: [
        {
          type: "DISCOUNT",
          value: {
            amount: 10,
            unit: '%',
          },
          priority: 1,
        },
        {
          type: "DISCOUNT",
          value: {
            amount: 10,
            unit: '%',
          },
          priority: 1,
        },
      ],
    },
    title: {
      label: "Title label",
      ariaLabel: "Aria label for title",
    },
    classification: {
      max: 5,
      min: 1,
      current: 3,
      ariaLabel: "Aria label for classification",
    },
    footerButtons: [
      {
        type: "ADD",
      },
      {
        type: "VIEW",
      },
    ],
    asChild: true,
  };

  const menuCardPropsFull: MenuCardProps = {
    variant: "full",
    header: {
      time: {
        ariaLabel: "Aria label for time",
        min: 0,
        max: 100,
        scale: "minutes"
      },
      price: {
        value: 10,
        currency: "USD",
        ariaLabel: "Aria label for price",
      },
      ariaLabel: "Aria label for header",
    },
    ariaLabel: "Aria label for MenuCard",
    primaryImage: {
      path: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
      alt: "Alt text for image",
      ariaLabel: "Aria label for image",
      labels: [
        {
          type: "DISCOUNT",
          value: {
            amount: 10,
            unit: '%',
          },
          priority: 1,
        }
      ],
    },
    title: {
      label: "Title label",
      ariaLabel: "Aria label for title",

    },
    classification: {
      max: 5,
      min: 1,
      current: 3,
      ariaLabel: "Aria label for classification",
    },
    footerButtons: [
      {
        type: "ADD",
      },
      {
        type: "VIEW",
      },
    ],
    asChild: true,
  };

  const menuCardPropsGhost: MenuCardProps = {
    variant: "ghost",
    header: {
      time: {
        ariaLabel: "Aria label for time",
        min: 0,
        max: 100,
        scale: "minutes"
      },
      price: {
        value: 10,
        currency: "USD",
        ariaLabel: "Aria label for price",
      },
      ariaLabel: "Aria label for header",
    },
    ariaLabel: "Aria label for MenuCard",
    primaryImage: {
      path: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
      alt: "Alt text for image",
      ariaLabel: "Aria label for image",
      labels: [
        {
          type: "DISCOUNT",
          value: {
            amount: 10,
            unit: '%',
          },
          priority: 1,
        }
      ],
    },
    title: {
      label: "Title label",
      ariaLabel: "Aria label for title",
    },
    classification: {
      max: 5,
      min: 1,
      current: 3,
      ariaLabel: "Aria label for classification",
    },
    footerButtons: [
      {
        type: "PROMOTION_DETAIL",
      },
      {
        type: "AR",
      },
    ],
    asChild: true,
  };*/

  return (
    <div>
      {
        /*
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
      </div> */
      }
      
      <CategoryButtonsBentoGrid></CategoryButtonsBentoGrid>
      
      {/* 
      <MenuCard {...menuCardProps}>
      </MenuCard>

      
       <MenuCard  {...menuCardPropsStandard}>
      </MenuCard>
      <MenuCard {...menuCardPropsFull}>
      </MenuCard>
      <MenuCard {...menuCardPropsGhost}>
      </MenuCard>
      */}
      
      
    </div>
  );
}
