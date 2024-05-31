import 'package:deep_copy/lib.dart';
import 'package:test/test.dart';

void main() {
  group('Map', () {
    final original1 = {'id': 1, 'name': 'Alice'};
    final original2 = {'id': 2, 'name': 'betty'};

    test('Success', () {
      final source = {'id': 1, 'name': 'Alice'};

      final Map<String, Object> copy = Map.from(source);

      copy['id'] = 2;
      copy['name'] = 'betty';

      expect([source, copy], [original1, original2]);
    });
  });

  group('1D Array', () {
    final original1 = [0, 1, 2];
    final original2 = [999, 1, 2];

    test('Success', () {
      final source = [0, 1, 2];

      final List<int> copy = List.from(source);

      copy[0] = 999;

      expect([source, copy], [original1, original2]);
    });
  });

  group('2D Array', () {
    final original1 = [
      [0, 0, 0],
      [1, 1, 1],
      [2, 2, 2]
    ];
    final original2 = [
      [999, 999, 999],
      [1, 1, 1],
      [2, 2, 2]
    ];

    test('Success', () {
      final source = [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ];

      final copy = deepCopy(source);

      copy[0][0] = 999;
      copy[0][1] = 999;
      copy[0][2] = 999;

      expect([source, copy], [original1, original2]);
    });

    test('Failure', () {
      final source = [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ];

      final List<List<int>> copy = List.from(source);

      copy[0][0] = 999;
      copy[0][1] = 999;
      copy[0][2] = 999;

      expect([source, copy], [original2, original2]);
    });
  });

  group('3D Array', () {
    final original1 = [
      [
        [0, 0, 0],
        [1, 1, 1],
        [2, 2, 2]
      ],
      [
        [3, 3, 3],
        [4, 4, 4],
        [5, 5, 5]
      ],
      [
        [6, 6, 6],
        [7, 7, 7],
        [8, 8, 8]
      ]
    ];

    final original2 = [
      [
        [999, 999, 999],
        [1, 1, 1],
        [2, 2, 2]
      ],
      [
        [3, 3, 3],
        [4, 4, 4],
        [5, 5, 5]
      ],
      [
        [6, 6, 6],
        [7, 7, 7],
        [8, 8, 8]
      ]
    ];

    test('Success', () {
      final source = [
        [
          [0, 0, 0],
          [1, 1, 1],
          [2, 2, 2]
        ],
        [
          [3, 3, 3],
          [4, 4, 4],
          [5, 5, 5]
        ],
        [
          [6, 6, 6],
          [7, 7, 7],
          [8, 8, 8]
        ]
      ];

      final copy = deepCopy(source);

      copy[0][0][0] = 999;
      copy[0][0][1] = 999;
      copy[0][0][2] = 999;

      expect([source, copy], [original1, original2]);
    });

    test('Failure', () {
      final source = [
        [
          [0, 0, 0],
          [1, 1, 1],
          [2, 2, 2]
        ],
        [
          [3, 3, 3],
          [4, 4, 4],
          [5, 5, 5]
        ],
        [
          [6, 6, 6],
          [7, 7, 7],
          [8, 8, 8]
        ]
      ];

      final List<List<List<int>>> copy = List.from(source);

      copy[0][0][0] = 999;
      copy[0][0][1] = 999;
      copy[0][0][2] = 999;

      expect([source, copy], [original2, original2]);
    });
  });
}
