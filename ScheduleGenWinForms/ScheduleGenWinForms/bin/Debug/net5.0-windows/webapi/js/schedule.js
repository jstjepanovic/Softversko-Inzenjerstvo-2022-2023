const have_intersection = (lhs, rhs) =>
{
        for (const L in lhs)
        {
                for (const R in rhs)
                {
                        if (L === R)
                        {
                                return true;
                        }
                }
        }
        return false;
};

const schedule = (courses, timeslots) =>
{
        let names      = [];
        let adj_matrix = new Array(courses.length).fill(new Array(courses.length).fill(false));

        for (let i = 0; i < courses.length; i++)
        {
                names.push(courses[i][0]);
                for (let j = i + 1; j < courses.length; j++)
                {
                        if (have_intersection(courses[i].slice(1), courses[j].slice(1)))
                        {
                                adj_matrix[i][j] = true;
                                adj_matrix[j][i] = true;
                        }
                }
        }

        for (let start_node = 0; start_node < courses.length; start_node++)
        {
                const visited = new Array(courses.length).fill(false);
                const colours = new Array(courses.length).fill(-1);
                const queue = [];

                let correct = true;
                queue.push(start_node);
                visited[start_node] = true;

                while (queue.length !== 0)
                {
                        const neighbour_colors = [];
                        const curr_node = queue.shift();

                        for (let i = 0; i < courses.length; i++)
                        {
                                if (adj_matrix[curr_node][i])
                                {
                                        neighbour_colors.push(colours[i]);
                                        if (!visited[i])
                                        {
                                                queue.push(i);
                                                visited[i] = true;
                                        }
                                }
                        }

                        let color = 0;
                        while (true)
                        {
                                if (!neighbour_colors.includes(color))
                                {
                                        break;
                                }
                                color += 1;
                        }

                        if (color >= timeslots.length)
                        {
                                correct = false;
                                break;
                        }
                        else
                        {
                                colours[curr_node] = color;
                        }
                }

                if (correct)
                {
                        const result = [];
                        for (const timeslot of timeslots)
                        {
                                result.push([timeslot]);
                        }

                        for (let i = 0; i < colours.length; i++)
                        {
                                result[colours[i]].push(names[i]);
                        }

                        return result;
                }

        }

        return [['-1']];
}
