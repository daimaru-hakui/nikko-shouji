"use client";
import React, { FC } from "react";
import { Stepper, Step, Typography } from "@material-tailwind/react";

interface Props {
  activeStep: number;
  setIsLastStep: (bool: boolean) => void;
  setIsFirstStep: (bool: boolean) => void;
}

const StepperWithContent: FC<Props> = ({
  activeStep,
  setIsLastStep,
  setIsFirstStep
}) => {

  return (
    <div className="mt-6 w-full max-w-[calc(1000px)] md:px-24 py-4 mx-auto">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step>
          1
          <div className="absolute -bottom-[2.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 0 ? "blue-gray" : "gray"}
              className="text-xs lg:text-lg"
            >
              発注入力
            </Typography>
          </div>
        </Step>
        <Step>
          2
          <div className="absolute -bottom-[2.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 1 ? "blue-gray" : "gray"}
              className="text-xs lg:text-lg"
            >
              お届け先入力
            </Typography>
          </div>
        </Step>
        <Step>
          3
          <div className="absolute -bottom-[2.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 2 ? "blue-gray" : "gray"}
              className="text-xs lg:text-lg"
            >
              確認
            </Typography>
          </div>
        </Step>
        <Step>
          4
          <div className="absolute -bottom-[2.5rem] w-max text-center">
            <Typography
              variant="h6"
              color={activeStep === 2 ? "blue-gray" : "gray"}
              className="text-xs lg:text-lg"
            >
              完了
            </Typography>
          </div>
        </Step>
      </Stepper>
    </div>
  );
};

export default StepperWithContent;