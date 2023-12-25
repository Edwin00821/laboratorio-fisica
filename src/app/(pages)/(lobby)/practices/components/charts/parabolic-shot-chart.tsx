'use client';

import { useEffect, useState, type FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// import { decimalAdjust } from '@/app/lib/utils';

import { Button } from '@/app/components/ui/button';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  UncontrolledFormMessage,
} from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';

import {
  ParabolicShotValidator,
  type TParabolicShotValidator,
} from '@/app/pages/practices/utils/validations';

interface IData {
  x: number;
  cliff?: number;
  parabolicShot?: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: string; stroke: string }[];
  label?: string;
}

const CustomTooltip: FC<CustomTooltipProps> = (props) => {
  const { active, payload, label } = props;

  if (active && payload && payload.length) {
    return (
      <div className="p-3 dark:border dark:border-slate-300 dark:bg-background">
        <p style={{ color: payload[0]?.stroke }}>{`x : ${label}`}</p>
        <p>{`y : ${payload[0]?.value}`}</p>
      </div>
    );
  }

  return null;
};

export const ParabolicShotChart: FC = () => {
  const [data, setData] = useState<IData[]>([]);

  const form = useForm<TParabolicShotValidator>({
    resolver: zodResolver(ParabolicShotValidator),
    defaultValues: {
      v0: 100,
      h: 200,
      R: 200,
    },
  });

  const { v0, h, R } = form.getValues();

  const onSubmit = (data: TParabolicShotValidator) => {
    console.log(data);
  };

  useEffect(() => {
    // const result: IData[] = [];

    // for (let i = h; i <= R * 2; i += 10) {
    //   const { x, y } = parabolicShotModel({ v0, R, h, xt: i });

    //   result.push({
    //     x: x,
    //     parabolicShot: decimalAdjust(y, 3),
    //   });
    // }

    setData([
      { x: 0, cliff: 0 },
      { x: 0, cliff: h },
      { x: R, cliff: h },
      { x: R, cliff: 0 },
      // ...result,
    ]);
  }, [v0, h, R]);

  return (
    <section className="flex w-full flex-col items-center justify-between">
      <Form {...form}>
        <form
          method="post"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
          className="flex w-full max-w-3xl flex-wrap items-center justify-center  gap-5 p-5"
        >
          <FormItem>
            <FormLabel>Velocidad de disparo</FormLabel>
            <FormControl>
              <Input
                inputMode="numeric"
                aria-invalid={!!form.formState.errors.v0}
                placeholder="v0"
                {...form.register('v0', {
                  valueAsNumber: true,
                })}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.v0?.message}
            />
          </FormItem>

          <FormItem>
            <FormLabel>Altura del acantilado</FormLabel>
            <FormControl>
              <Input
                inputMode="numeric"
                aria-invalid={!!form.formState.errors.h}
                placeholder="h"
                {...form.register('h', {
                  valueAsNumber: true,
                })}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.h?.message}
            />
          </FormItem>

          <FormItem>
            <FormLabel>Longitud del acantilado</FormLabel>
            <FormControl>
              <Input
                inputMode="numeric"
                aria-invalid={!!form.formState.errors.R}
                placeholder="R"
                {...form.register('R', {
                  valueAsNumber: true,
                })}
              />
            </FormControl>
            <UncontrolledFormMessage
              message={form.formState.errors.R?.message}
            />
          </FormItem>

          <Button type="submit" variant="ghost" className="w-full border-2">
            Submit
          </Button>
        </form>
      </Form>

      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            name="Tiro parabólico"
            dataKey="parabolicShot"
            stroke="#8884d8"
          />
          <Line type="step" dataKey="cliff" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

interface ParabolicShotModelProps {
  v0: number;
  h: number;
  R: number;
  xt: number;
}

const parabolicShotModel = ({ v0, h, R, xt }: ParabolicShotModelProps) => {
  const g = 9.8;
  const phi = Math.asin((g * R) / v0 ** 2) / 2;

  // v0 = velocidad inicial
  // h = altura del acantilado
  // R = longitud del acantilado

  const t = (2 * v0 * Math.sin(phi)) / g;
  const x = v0 * t * Math.cos(phi);
  const y = v0 * t * Math.sin(phi) - 0.5 * g * t ** 2 + h;

  //crecimiento logistico
  return { x, y };
};
