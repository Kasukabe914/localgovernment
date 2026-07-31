export const COMMUNITY_REPRESENTATION_POPULATION = 15000;
export const MINIMUM_COMMUNITY_COUNCIL_MEMBERS = 4;

// MartinJenkins' July 2026 illustration uses about one Community Council
// member per 15,000 residents, with four members for each of the smaller
// Community Councils. Unitary councillors are dual-role members of their
// Community Council, so the local tier must never contain fewer seats than
// the area's allocation on the governing body.
export const suggestedCommunityCouncilMembers = (
  population,
  unitarySeats = 1
) => Math.max(
  MINIMUM_COMMUNITY_COUNCIL_MEMBERS,
  Math.floor(Math.max(0, population) / COMMUNITY_REPRESENTATION_POPULATION),
  Math.max(0, unitarySeats)
);

export const buildCommunityCouncilModel = (wardAllocation) =>
  wardAllocation.map(({ member, seats: unitarySeats }) => {
    const totalMembers = suggestedCommunityCouncilMembers(
      member.pop,
      unitarySeats
    );
    return {
      member,
      totalMembers,
      unitarySeats,
      communityOnlySeats: totalMembers - unitarySeats,
    };
  });

