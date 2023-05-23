import Country from "../entity/Country";
import { CountryInput } from "../entity/Country";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import dataSource from "../db";

@Resolver(Country)
export class CountryResolver {
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    const countries = await dataSource.getRepository(Country).find();

    return countries.map((c) => ({ ...c, emoji: c.emoji || "" }));
  }

  @Query(() => [Country])
  async countriesByCode(@Arg("code") code: string): Promise<Country[]> {
    const countries = await dataSource
      .getRepository(Country)
      .find({ where: { code } });

    return countries.map((c) => ({ ...c, name: c.name, emoji: c.emoji || "" }));
  }

  @Mutation(() => Country)
  async createCountry(@Arg("data") data: CountryInput): Promise<Country> {
    return await dataSource.getRepository(Country).save(data);
  }
}
